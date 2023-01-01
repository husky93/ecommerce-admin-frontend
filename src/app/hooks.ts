import { handleMutationError } from '../app/modules';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { useStateContext } from '../context';
import type {
  PostApiRequest,
  PutApiRequest,
  DeleteApiRequest,
} from '../app/api/types';

export const useFormMutation = (
  apiRequest: PutApiRequest | PostApiRequest | DeleteApiRequest,
  name: string,
  goToId?: boolean
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useStateContext();
  const { id } = useParams();

  const from =
    ((location.state as any)?.from.pathname as string) ||
    `/dashboard/${goToId ? `${name}/${id}` : name}`;

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    (data: any) => {
      if (!data) {
        return (apiRequest as DeleteApiRequest)(state.authUser?.token, id);
      }
      if (!id) {
        return (apiRequest as PostApiRequest)(state.authUser?.token, data);
      } else
        return (apiRequest as PutApiRequest)(state.authUser?.token, id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [name] });
        navigate(from);
      },
      onError: handleMutationError,
    }
  );

  return { mutate, isLoading, error };
};
