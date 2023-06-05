import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';
import { WagmiConfig, configureChains, createConfig, sepolia } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import DefaultLayout from 'layouts/DefaultLayout';
import ThemeProvider from 'context/ThemeProvider';

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

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <WagmiConfig config={config}>
        <RouterProvider router={router} />
      </WagmiConfig>
    </ThemeProvider>
  </React.StrictMode>
);
