import Button from 'components/Button';
import MainContainer from 'components/MainContainer';
import { useFaucet } from 'context/FaucetProvider';
import dayjs from 'dayjs';
import { faucetContractABI } from 'lib/contract';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toast } from 'react-toastify';
import { waitForTransaction } from '@wagmi/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

dayjs.extend(relativeTime);

function App() {
  const [processingTransaction, setProcessingTransaction] = useState(false);

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
    if (!writeAsync) return;

    setProcessingTransaction(true);
    try {
      const { hash } = await writeAsync();
      await waitForTransaction({
        hash,
      });
    } catch (error) {
      reset?.();
      toast.error('An error occured while making the transaction.');
    } finally {
      await refetch?.();
      // Refetch after timeout
      setTimeout(() => {
        refetch?.();
      }, Number((lastMinted * 1000n).toString()));

      setProcessingTransaction(false);
    }
  };

  const nextMintMinDate = dayjs(Number((lastMinted * 1000n).toString())).add(
    Number(mintInterval.toString()),
    'seconds'
  );
  const alreadyMinted = nextMintMinDate.isAfter(dayjs());

  const FaucetButtonDisabled =
    processingTransaction ||
    !writeAsync ||
    isError ||
    isLoading ||
    isErrorWrite ||
    isLoadingWrite ||
    alreadyMinted;

  return (
    <>
      <MainContainer>
        <div>
          <div className="inline-block">
            <Button onClick={handleClick} disabled={FaucetButtonDisabled}>
              Mint MEWO
            </Button>
          </div>
          {processingTransaction && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="inline-block ml-2"
            />
          )}
        </div>
        {alreadyMinted && <span>Next mint {nextMintMinDate.fromNow()}</span>}
      </MainContainer>
    </>
  );
}

export default App;
