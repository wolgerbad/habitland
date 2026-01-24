import { NextResponse } from 'next/server';
import { supabase } from '../../../_lib/supabase';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../_lib/helpers';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15m'),
  prefix: 'habitland'
})

export async function POST(req) {
  const h = (await headers())

  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json(
      { error: 'Invalid user info' },
      {
        status: 404,
      }
    );

  const ip = h.get('x-ip-token') ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const rl = await ratelimit.limit(ip)

  if(!rl.success) return NextResponse.json({error: 'Too many requests. Try again later'}, {status: 400})

  let { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error || !user || user.length === 0)
    return NextResponse.json({ error: 'Invalid user info' }, { status: 400 });

  const verified = await bcrypt.compare(password, user[0].password);

  if (!verified)
    return NextResponse.json({ error: 'Invalid user info' }, { status: 400 });

  const token = generateToken(user[0].id);

  const res = NextResponse.json({
    message: 'Welcome to the login api',
    token,
  });

  res.cookies.set({
    name: 'jwt',
    value: token,
    httpOnly: true,
  });

  return res;
}
