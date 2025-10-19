import { DarkModeContextProvider } from './components/DarkModeContext';
import Theme from './components/Theme';
import './globals.css';

export const metadata = {
  title: 'HabitLand',
  description: 'Track your habits and build better routines',
};

export default function RootLayout({ children }) {
  return (
    <DarkModeContextProvider>
      <html lang="en">
        <body className="bg-bgPrimary light">
          <Theme />
          {children}
        </body>
      </html>
    </DarkModeContextProvider>
  );
}
