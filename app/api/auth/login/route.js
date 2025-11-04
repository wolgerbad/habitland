import { NextResponse } from 'next/server';
import { supabase } from '../../../_lib/supabase';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../_lib/helpers';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json(
      { error: 'Invalid user info' },
      {
        status: 404,
      }
    );

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
