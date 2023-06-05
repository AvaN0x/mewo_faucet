import { ReactNode } from 'react';

export default function MainContainer({ children }: { children?: ReactNode }) {
  return (
    <div className="w-full max-w-[450px]">
      <div className="rounded-lg bg-slate-300 dark:bg-slate-900 p-8 shadow-2xl mx-4">
        {children}
      </div>
    </div>
  );
}
