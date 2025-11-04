import { DarkModeContextProvider } from './components/DarkModeContext';
import Theme from './components/Theme';
import MobileNav from './components/MobileNav';
import './globals.css';
import { getCookie } from './_lib/actions';
import { checkJwtValidity, getHabitLogs, getHabits } from './_lib/helpers';
import HabitContextProvider from './components/HabitContext';

export const metadata = {
  title: 'HabitLand',
  description: 'Track your habits and build better routines',
};

export default async function RootLayout({ children }) {
  const jwtCookie = await getCookie('jwt');
  const decoded = checkJwtValidity(jwtCookie);

  const habits = decoded ? await getHabits(decoded.id) : null;
  const habitLogs = decoded ? await getHabitLogs() : null;

  return (
    <DarkModeContextProvider>
      <HabitContextProvider
        habits={habits}
        habitLogs={habitLogs}
        userId={decoded?.id}
      >
        <html lang="en">
          <body className="bg-bgPrimary light relative max-h-svh overflow-y-scroll">
            <Theme />
            {children}
            {decoded && <MobileNav />}
          </body>
        </html>
      </HabitContextProvider>
    </DarkModeContextProvider>
  );
}
