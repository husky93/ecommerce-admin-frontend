import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './routes/RouteSwitch';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StateContextProvider } from './context';
import { IconContext } from 'react-icons';

import 'normalize.css';
import './assets/styles/globals.css';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 10000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StateContextProvider>
      <QueryClientProvider client={queryClient}>
        <IconContext.Provider value={{ size: '1.25rem' }}>
          <RouteSwitch />
          <ReactQueryDevtools initialIsOpen={false} />
        </IconContext.Provider>
      </QueryClientProvider>
    </StateContextProvider>
  </React.StrictMode>
);
