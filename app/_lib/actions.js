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

export async function addNewHabit(formData) {
  const name = formData.get('name');
  const data = getLast30DaysLogs([]);

  const { d, error } = await supabase
    .from('habits')
    .insert([
      {
        name,
        data,
      },
    ])
    .select();

  revalidatePath('/');
  console.log(d, error);
}

export async function handleDeleteLog(date) {
  const { error } = await supabase.from('habit_logs').delete().eq('date', date);

  if (error) console.error(error.message);

  revalidatePath('/');
}

export async function handleAddLog(date, habitId) {
  const { data, error } = await supabase
    .from('habit_logs')
    .insert([{ date, completed: 1, habit_id: habitId }])
    .select();

  if (error) console.error(error.message);

  console.log(data);

  revalidatePath('/');
}

export async function deleteHabit(id) {
  const { err } = await supabase.from('habit_logs').delete().eq('habit_id', id);
  const { error } = await supabase.from('habits').delete().eq('id', id);

  if (error) console.error(error.message);

  revalidatePath('/');
}
