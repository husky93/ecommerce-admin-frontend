import React from 'react';
import EditList from '../components/EditList';
import { useQuery } from 'react-query';
import { getTransactions } from '../app/api/api';
import { useStateContext } from '../context';

const Transactions: React.FC = ({}) => {
  const { state } = useStateContext();
  const { isLoading, isError, data, error } = useQuery('transactions', () =>
    getTransactions(state.authUser?.token)
  );

  return (
    <div>
      <EditList
        isLoading={isLoading}
        isError={isError}
        data={data}
        error={error}
        name="categories"
      />
    </div>
  );
};

export default Transactions;
