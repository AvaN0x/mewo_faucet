import { configureChains, createConfig, erc20ABI, sepolia } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const mewoContractABI = [...erc20ABI];

const faucetContractABI = [
  {
    name: 'mint',
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        internalType: 'address',
        name: 'who',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    name: 'lastMinted',
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'MAX_MINT',
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'MINT_INTERVAL',
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
] as const;

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);
const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export { publicClient, wagmiConfig, mewoContractABI, faucetContractABI };
