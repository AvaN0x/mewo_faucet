import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';
import { WagmiConfig } from 'wagmi';
import DefaultLayout from 'layouts/DefaultLayout';
import ThemeProvider from 'context/ThemeProvider';
import { wagmiConfig } from 'lib/contract';
import ErrorPage from 'pages/error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FaucetProvider from 'context/FaucetProvider';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <DefaultLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <App />,
        },
      ],
    },
  ],
  {
    basename: '/mewo_faucet',
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        <FaucetProvider>
          <>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              theme="light"
            />
          </>
        </FaucetProvider>
      </WagmiConfig>
    </ThemeProvider>
  </React.StrictMode>
);
