import React from 'react';
import ProtectedRoutes from './ProtectedRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ErrorPage from './Error';
import Home from './Home';
import Categories from './Categories';
import Category from './Category';
import Items from './Items';
import Transactions from './Transactions';
import { useStateContext } from '../context';

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
            element={<Dashboard />}
            errorElement={<ErrorPage />}
          >
            <Route index element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:id" element={<Category />} />
            <Route path="items" element={<Items />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RouteSwitch;
