import Login from 'components/Login';
import MainContainer from 'components/MainContainer';
import ThemeButton from 'components/ThemeButton';
import UserProfile from 'components/UserProfile';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

export default function DefaultLayout() {
  const { isConnected } = useAccount();

  return (
    <>
      <main className="flex flex-col items-center bg-slate-100 dark:bg-slate-800 h-screen justify-center font-roboto">
        <ThemeButton />
        {isConnected && <UserProfile />}

        {!isConnected ? (
          <MainContainer>
            <Login />
          </MainContainer>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
}
