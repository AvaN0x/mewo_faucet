type Theme = 'dark' | 'light';

type ThemeContext = {
  theme: Theme;
  change?: (theme: Theme) => void;
};

type FaucetContext = {
  balance: bigint;
  maxMint: bigint;
  lastMinted: bigint;
  mintInterval: bigint;
  isError?: boolean;
  isLoading?: boolean;
  refetch?: () => Promise<any[]>;
};
