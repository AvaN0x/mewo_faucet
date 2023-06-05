import Button from 'components/Button';
import { useAccount, useEnsName } from 'wagmi';

export default function UserProfile() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="absolute top-6 left-6 bg-slate-500 dark:bg-slate-600 py-1 px-4 !text-white !rounded-full shadow-2xl transition-transform">
      <Button
        href={`${import.meta.env.VITE_ETHERSCAN_URL}address/${address}`}
        title={address ?? ''}
        className="text-white hover:!text-primary"
      >
        {ensName ?? address}
      </Button>
    </div>
  );
}
