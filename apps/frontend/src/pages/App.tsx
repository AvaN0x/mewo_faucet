import Button from 'components/Button';
import MainContainer from 'components/MainContainer';
import { useFaucet } from 'context/FaucetProvider';
import dayjs from 'dayjs';
import { faucetContractABI } from 'lib/contract';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function App() {
  const { address } = useAccount();
  const { maxMint, lastMinted, mintInterval, isError, isLoading, refetch } =
    useFaucet();

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_FAUCET_ADDRESS as '0x{string}',
    abi: faucetContractABI,
    functionName: 'mint',
    args: [address!, maxMint],
  });
  const {
    writeAsync,
    reset,
    isError: isErrorWrite,
    isLoading: isLoadingWrite,
  } = useContractWrite(config);

  const handleClick = async () => {
    try {
      await writeAsync?.();
    } catch (error) {
      reset?.();
      refetch?.();
    }
  };

  const nextMintMinDate = dayjs(Number((lastMinted * 1000n).toString())).add(
    Number(mintInterval.toString()),
    'seconds'
  );
  const alreadyMinted = nextMintMinDate.isAfter(dayjs());

  const FaucetButtonDisabled =
    !writeAsync ||
    isError ||
    isLoading ||
    isErrorWrite ||
    isLoadingWrite ||
    alreadyMinted;

  return (
    <>
      <MainContainer>
        <Button onClick={handleClick} disabled={FaucetButtonDisabled}>
          Mint MEWO
        </Button>
        {alreadyMinted && <span>Next mint {nextMintMinDate.fromNow()}</span>}
      </MainContainer>
    </>
  );
}

export default App;
