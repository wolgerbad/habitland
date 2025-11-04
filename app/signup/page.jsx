import { getCookie } from '../_lib/actions';
import { checkJwtValidity } from '../_lib/helpers';
import SignUpClient from './SignUpClient';
import { redirect } from 'next/navigation';

export default async function signupPage() {
  const jwtCookie = await getCookie('jwt');

  const decoded = checkJwtValidity(jwtCookie);

  if (decoded) redirect('/');

  return <SignUpClient />;
}
