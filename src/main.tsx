import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './routes/RouteSwitch';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StateContextProvider } from './context';
import 'normalize.css';
import './assets/styles/globals.css';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StateContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouteSwitch />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StateContextProvider>
  </React.StrictMode>
);
