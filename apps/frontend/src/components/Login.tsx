import Button from 'components/Button';
import { toast } from 'react-toastify';
import { useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function Login() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const handleConnect = () => {
    try {
      connect();
    } catch (error) {
      console.error(error);
      toast.error('An error occured while connecting to the wallet.');
    }
  };

  return (
    <>
      <Button onClick={handleConnect}>Connect Wallet</Button>
    </>
  );
}
