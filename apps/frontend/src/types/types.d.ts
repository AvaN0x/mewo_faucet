type Theme = 'dark' | 'light';

type ThemeContext = {
  theme: Theme;
  change?: (theme: Theme) => void;
};
