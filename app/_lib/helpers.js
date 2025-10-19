import { revalidatePath } from 'next/cache';
import { supabase } from './supabase';

export const revalidate = 10;

export async function getHabits() {
  let { data: habits, error } = await supabase.from('habits').select('*');

  if (error) throw new Error('Some error occured while retrieving habits');

  return habits;
}

export async function getHabitLogs() {
  let { data, error } = await supabase.from('habit_logs').select('*');

  if (error) throw new Error(error.message);

  return data;
}
