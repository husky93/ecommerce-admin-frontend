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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Login />} errorElement={<ErrorPage />}></Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
