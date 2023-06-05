import Button from 'components/Button';
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
    }
  };

  return (
    <>
      <Button onClick={handleConnect}>Connect Wallet</Button>
    </>
  );
}
