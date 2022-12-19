import React from 'react';
import ProtectedRoutes from './ProtectedRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './Root';
import Login from './Login';
import ErrorPage from './Error';
import { useStateContext } from '../context';
import type { UserPost } from '../app/api/types';

interface RouteSwitchProps {}

const RouteSwitch: React.FC<RouteSwitchProps> = ({}) => {
  const { state } = useStateContext();
  const { authUser } = state;

  console.log(state);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route element={<ProtectedRoutes auth={authUser !== null} />}>
          <Route
            path="/dashboard"
            element={<Root />}
            errorElement={<ErrorPage />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RouteSwitch;
