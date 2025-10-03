import './globals.css';
import { HabitsContextProvider } from './components/HabitsContext';

export const metadata = {
  title: 'HabitLand',
  description: 'Track your habits and build better routines',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HabitsContextProvider>{children}</HabitsContextProvider>
      </body>
    </html>
  );
}
