import { ReactNode } from 'react';

export default function MainContainer({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className="mb-8 text-gray-800 dark:text-white">
        <h1 className="text-6xl">MEWO Faucet</h1>
        <p>You can use the faucet once every 30 minutes.</p>
      </div>
      <div className="w-full max-w-[450px] text-gray-800 dark:text-white">
        <div className="rounded-lg bg-slate-300 dark:bg-slate-900 p-8 shadow-2xl mx-4">
          {children}
        </div>
      </div>
    </>
  );
}
