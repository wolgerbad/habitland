import Header from './components/Header';
import Main from './components/Main';
import { checkJwtValidity } from './_lib/helpers';
import { redirect } from 'next/navigation';
import { getCookie } from './_lib/actions';

export default async function Home() {
  const jwtCookie = await getCookie('jwt');
  if (!jwtCookie) redirect('/login');

  const decoded = checkJwtValidity(jwtCookie);

  if (!decoded.id) redirect('/login');
  const userId = decoded.id;

  return (
    <div className="max-w-2xl mx-auto">
      <Header />
      <Main userId={userId} />
    </div>
  );
}
