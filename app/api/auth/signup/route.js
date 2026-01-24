import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken, getUserByEmail } from '../../../_lib/helpers';
import { supabase } from '../../../_lib/supabase';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'habitland'
})

export async function POST(req) {
  const h = (await headers());

  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password)
    return NextResponse.json(
      { message: 'Make sure to fill all inputs.' },
      { status: 404 }
    );
    
  const ip = h.get('x-ip-token') ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "unknown";

  const rl = await ratelimit.limit(ip)
  
  if(!rl.success) return NextResponse.json({error: 'Too many requests. Try again later', status: 500})


  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = { name, email, password: hashedPassword };

  const user = await getUserByEmail(email);

  if (user)
    return NextResponse.json(
      { error: 'User already exists.' },
      { status: 401 }
    );

  const { data, error } = await supabase
    .from('users')
    .insert([newUser])
    .select();

  const token = generateToken(data[0].id);

  const res = NextResponse.json({ name, email });

  res.cookies.set({
    name: 'jwt',
    value: token,
    httpOnly: true,
  });

  return res;
}
