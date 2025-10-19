'use server';

import { eachDayOfInterval, format, subDays } from 'date-fns';
import { createHabit } from './helpers';
import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';

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

export async function addNewHabit(habitName) {
  const { d, error } = await supabase
    .from('habits')
    .insert([
      {
        name: habitName,
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
