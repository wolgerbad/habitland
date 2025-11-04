import { redirect } from 'next/navigation';
import { getCookie } from '../_lib/actions';
import { checkJwtValidity, getHabits, getUser } from '../_lib/helpers';
import { format } from 'date-fns';
import AccountClient from './AccountClient';

export const metadata = {
  title: 'Account • HabitLand',
};

export default async function AccountPage() {
  const jwtCookie = await getCookie('jwt');
  const decoded = checkJwtValidity(jwtCookie);

  if (!decoded?.id) redirect('/login');

  const user = await getUser(decoded.id);

  const habits = await getHabits(user.id);
  const habitsLength = habits.length;

  const createdAt = format(user.created_at, 'MMM dd, yyyy');

  return (
    <AccountClient
      user={user}
      createdAt={createdAt}
      habitsLength={habitsLength}
    />
  );
}
