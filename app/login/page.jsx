import { cookies } from 'next/headers';
import LoginClient from './LoginClient';
import { checkJwtValidity } from '../_lib/helpers';
import { getCookie } from '../_lib/actions';
import { redirect } from 'next/navigation';

export default async function loginPage() {
  const token = await getCookie('jwt');

  const decoded = checkJwtValidity(token);

  if (decoded?.id) redirect('/');

  return <LoginClient />;
}
