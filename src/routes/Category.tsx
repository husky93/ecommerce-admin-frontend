import React from 'react';
import styles from '../assets/styles/routes/Category.module.css';
import Spinner from '../components/Spinner';
import CategoryForm from '../components/CategoryForm';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deleteCategory } from '../app/api/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCategory } from '../app/api/api';
import { useStateContext } from '../context';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

interface CategoryProps {
  mode: 'update' | 'create';
}

const Category: React.FC<CategoryProps> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useStateContext();

  const query = useQuery(['categories', id], () => getCategory(id));

  const queryClient = useQueryClient();

  const from =
    ((location.state as any)?.from.pathname as string) ||
    '/dashboard/categories';

  const { mutate: deleteCategoryFn, isLoading: isDeleting } = useMutation(
    () => {
      return deleteCategory(id, state.authUser?.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        navigate(from);
      },
      onError: (error: any) => {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error as any).response.data.message, {
            position: 'top-right',
          });
        }
      },
    }
  );

  const handleDelete = (): void => {
    deleteCategoryFn();
  };

  return (
    <div className={styles.category}>
      <ToastContainer />
      {query.isLoading || (isDeleting && <Spinner />)}
      {query.isError && <span>Error: {(query.error as any).message}</span>}
      {query.data && (
        <div>
          <button onClick={handleDelete}>Delete Category</button>
          <CategoryForm data={query.data} mode={mode} />
        </div>
      )}
      {mode === 'create' && <CategoryForm mode={mode} />}
    </div>
  );
};

export default Category;
