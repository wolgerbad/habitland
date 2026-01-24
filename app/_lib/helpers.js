import { revalidatePath } from 'next/cache';
import { supabase } from './supabase';
import jwt from 'jsonwebtoken';

export const revalidate = 10;

export async function getHabits(userId) {
  let { data: habits, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error('Some error occured while retrieving habits');

  return habits;
}

export async function getHabitLogs() {
  let { data, error } = await supabase.from('habit_logs').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser(id) {
  let { data, error } = await supabase.from('users').select('*').eq('id', id);

  if (error) throw new Error(error.message);

  const { name, email, created_at } = data[0];

  return { id, name, email, created_at };
}

export async function generateToken(id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
}

export function checkJwtValidity(jwtCookie) {
  if (!jwtCookie) return;
  const decoded = jwt.verify(jwtCookie, process.env.JWT_SECRET);
  if (!decoded.id) return 'Invalid user info';
  return decoded;
}

export async function getUserByEmail(email) {
  let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error) throw new Error(error.message);

  return data[0];
}
