import { NextResponse } from 'next/server';

export async function GET(req) {
  const res = NextResponse.json({ message: 'logged out succesfully' });
  res.cookies.delete('jwt');

  return res;
}
