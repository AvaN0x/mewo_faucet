import { faucetContractABI } from 'lib/contract';
import { createContext, useContext, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

const FaucetContext = createContext<FaucetContext>({
  maxMint: 0n,
  lastMinted: 0n,
  mintInterval: 0n,
});
export const useFaucet = () => useContext(FaucetContext);

export default function FaucetProvider({
  children,
}: {
  children?: JSX.Element;
}) {
  const { address } = useAccount();
  const {
    data: maxMint = 0n,
    isError: isErrorMaxMint,
    isLoading: isLoadingMaxMint,
    refetch: refetchMaxMint,
  } = useContractRead({
    address: import.meta.env.VITE_FAUCET_ADDRESS as '0x{string}',
    abi: faucetContractABI,
    functionName: 'MAX_MINT',
  });
  const {
    data: lastMinted = 0n,
    isError: isErrorLastMinted,
    isLoading: isLoadingLastMinted,
    refetch: refetchLastMinted,
  } = useContractRead({
    address: import.meta.env.VITE_FAUCET_ADDRESS as '0x{string}',
    abi: faucetContractABI,
    functionName: 'lastMinted',
    args: [address!],
  });
  const {
    data: mintInterval = 0n,
    isError: isErrorMintInterval,
    isLoading: isLoadingMintInterval,
    refetch: refetchMintInterval,
  } = useContractRead({
    address: import.meta.env.VITE_FAUCET_ADDRESS as '0x{string}',
    abi: faucetContractABI,
    functionName: 'MINT_INTERVAL',
  });

  const refetch = async () => {
    return Promise.all([
      refetchMaxMint,
      refetchLastMinted,
      refetchMintInterval,
    ]);
  };

  return (
    <FaucetContext.Provider
      value={{
        maxMint,
        lastMinted,
        mintInterval,
        isError: isErrorMaxMint || isErrorLastMinted || isErrorMintInterval,
        isLoading:
          isLoadingMaxMint || isLoadingLastMinted || isLoadingMintInterval,
        refetch,
      }}
    >
      {children}
    </FaucetContext.Provider>
  );
}
