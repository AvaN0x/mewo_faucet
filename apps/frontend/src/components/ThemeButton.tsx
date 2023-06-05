import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import { ReactNode } from 'react';
import { useTheme } from 'context/ThemeProvider';

export default function ThemeButton({ children }: { children?: ReactNode }) {
  const { theme, change } = useTheme();

  const handleClick = () => {
    // Change should always be defined at this point
    if (change) {
      change(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <Button
      className="absolute top-6 max-[480px]:top-20 right-6 bg-slate-500 dark:bg-slate-600 !aspect-square !w-10 !h-10 !text-white hover:!text-primary !rounded-full shadow-2xl hover:scale-105 transition-transform"
      onClick={handleClick}
    >
      {theme === 'dark' && <FontAwesomeIcon icon={faMoon} />}
      {theme === 'light' && <FontAwesomeIcon icon={faSun} />}
      {children}
    </Button>
  );
}
