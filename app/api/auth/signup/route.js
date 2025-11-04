import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken, getUserByEmail } from '../../../_lib/helpers';
import { supabase } from '../../../_lib/supabase';

export async function POST(req) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password)
    return NextResponse.json(
      { message: 'Make sure to fill all inputs.' },
      { status: 404 }
    );

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
