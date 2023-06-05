import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<ThemeContext>({ theme: 'dark' });
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children?: JSX.Element;
}) {
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );

  const changeTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);

    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, change: changeTheme }}>
      <div className={`${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
