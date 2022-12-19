import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root';
import Login from './routes/Login';
import ErrorPage from './routes/Error';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StateContextProvider } from './context';
import './assets/styles/globals.css';

import { ReactQueryDevtools } from 'react-query/devtools';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Login />} errorElement={<ErrorPage />}></Route>
  )
);

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
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StateContextProvider>
  </React.StrictMode>
);
