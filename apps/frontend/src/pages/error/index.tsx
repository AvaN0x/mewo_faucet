import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as any;
  let code, message;
  if ('status' in error) {
    // ErrorResponse
    code = error.status;
    message = error.statusText;
  } else if ('message' in error) {
    // Error
    code = 500;
    message = error.message;
  }

  return (
    <main className="flex flex-col items-center bg-slate-100 dark:bg-slate-800 h-screen justify-center font-roboto">
      <div className="rounded-lg bg-slate-300 dark:bg-slate-900 text-gray-800 dark:text-gray-200 p-8 shadow-2xl min-w-[400px] text-center">
        <h1 className="text-9xl">{code ?? 500}</h1>
        <h2 className="text-4xl mt-[-1rem]">{message || 'Oopsie'}</h2>
        <p className="pt-4">
          <Link to="/" className="text-primary text-md">
            Home page
          </Link>
        </p>
      </div>
    </main>
  );
}
