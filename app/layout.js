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
      <html lang="en" className="light">
        <body className="bg-bgPrimary ">
          <Theme />
          {children}
        </body>
      </html>
    </DarkModeContextProvider>
  );
}
