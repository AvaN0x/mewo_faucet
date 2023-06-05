/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ETHERSCAN_URL: string;
  readonly VITE_FAUCET_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
