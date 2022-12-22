import { handleMutationError } from '../app/modules';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { useStateContext } from '../context';
import type { Category, Item, Transaction } from '../app/api/types';

export const useFormMutation = (
  apiRequest: (
    data: any,
    token: string | undefined,
    id?: string | undefined
  ) => Promise<Category | Item | Transaction | undefined>,
  name: 'categories' | 'items' | 'transactions'
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useStateContext();
  const { id } = useParams();

  const from =
    ((location.state as any)?.from.pathname as string) || `/dashboard/${name}`;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data: any) => apiRequest(data, state.authUser?.token, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(name);
        navigate(from);
      },
      onError: handleMutationError,
    }
  );

  return { mutate, isLoading };
};
