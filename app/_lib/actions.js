'use server';

import { eachDayOfInterval, format, subDays } from 'date-fns';
import { supabase } from './supabase';
import bcrypt from 'bcryptjs';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { generateToken, getUserByEmail } from './helpers';

function getLast30DaysLogs(habitLogs) {
  const today = new Date();
  const last30Days = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  });

  return last30Days.map((day) => {
    const dateStr = format(day, 'MMM d');
    const log = habitLogs.find((l) => l.date === dateKey);
    return {
      date: dateStr,
      completed: log ? log.completed : 0,
    };
  });
}

// ******************HABIT OPERATIONS**************************

export async function addNewHabit(habitName, userId) {
  const { d, error } = await supabase
    .from('habits')
    .insert([
      {
        name: habitName,
        user_id: userId,
      },
    ])
    .select();

  revalidatePath('/');
}

export async function deleteHabit(id) {
  const { err } = await supabase.from('habit_logs').delete().eq('habit_id', id);
  const { error } = await supabase.from('habits').delete().eq('id', id);

  if (error) console.error(error.message);

  revalidatePath('/');
}

export async function updateHabit(id, title) {
  if (title.length < 2) return null;

  const { data, error } = await supabase
    .from('habits')
    .update({ name: title })
    .eq('id', id)
    .select();

  if (error) console.error(error.message);

  revalidatePath('/');
}

// ****************HABITLOG OPERATIONS********************

export async function deleteLog(id) {
  const { error } = await supabase.from('habit_logs').delete().eq('id', id);

  if (error) console.error('error:', error.message);
  revalidatePath('/');
}

export async function addNewLog(newLog) {
  const { data, error } = await supabase
    .from('habit_logs')
    .insert([newLog])
    .select();

  if (error) console.error(error.message);

  revalidatePath('/');
}

export async function updateLog(completed, id) {
  const { data, error } = await supabase
    .from('habit_logs')
    .update({ completed })
    .eq('id', id)
    .select();

  if (error) console.error(error.message);

  revalidatePath('/');
}

export async function getCookie(cookie) {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get(cookie)?.value;
  if (!cookieVal) return;

  return cookieVal;
}

// ****************AUTH OPERATIONS********************

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15m'),
  prefix: 'habitland'
})

export async function login(prev, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const h = (await headers())

  if (!email || !password) return { error: 'Invalid user info' }
      
  const ip = h.get('x-ip-token') ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const rl = await ratelimit.limit(ip)

  if(!rl.success) return {error: 'Too many requests. Try again later'}

  let { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error || !user || user.length === 0) return { error: 'Invalid user info' };

  const verified = await bcrypt.compare(password, user[0].password);

  if (!verified)
    return { error: 'Invalid user info' };

  const token = await generateToken(user[0].id);

  (await cookies()).set('jwt', token)

  return {error: null};
}

export async function signup(prev, formData) {
  const h = (await headers())
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    
    const ip = h.get('x-ip-token') ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  
    const rl = await ratelimit.limit(ip)  
    if(!rl.success) return {error: 'Too many requests. Try again later'}
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = { name, email, password: hashedPassword };
  
    const user = await getUserByEmail(email);
  
    if (user) return { error: 'User already exists.' }

    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select();
  
    const token = await generateToken(data[0].id);
  
  (await cookies()).set('jwt', token)
  
   return {error: null};  
  }
  

 export async function logout() {
    (await cookies()).delete('jwt')
  }