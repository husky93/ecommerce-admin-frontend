import React, { useEffect } from 'react';
import FormInput from './FormInput';
import Spinner from './Spinner';
import styles from '../assets/styles/components/CategoryForm.module.css';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../context';
import { useMutation, useQueryClient } from 'react-query';
import { postCategory, putCategory, getCategories } from '../app/api/api';
import { ToastContainer } from 'react-toastify';
import { handleMutationError } from '../app/modules';
import type { Category } from '../app/api/types';

interface CategoryFormProps {
  mode: 'update' | 'create';
  data?: Category;
}

const categorySchema = object({
  title: string()
    .min(1, 'Title is required')
    .max(150, 'Title must have maximum 150 characters'),
  description: string().min(1, 'Description is required'),
});

export type CategoryInput = TypeOf<typeof categorySchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({ data, mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useStateContext();
  const { id } = useParams();

  const from =
    ((location.state as any)?.from.pathname as string) ||
    '/dashboard/categories';

  const methods = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate: postCategoryFn, isLoading } = useMutation(
    (categoryData: CategoryInput) => {
      if (mode === 'create')
        return postCategory(categoryData, state.authUser?.token);
      else return putCategory(categoryData, id, state.authUser?.token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        navigate(from);
      },
      onError: handleMutationError,
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<CategoryInput> = (values) => {
    postCategoryFn(values);
  };

  return (
    <div>
      <ToastContainer />
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="input_group">
            <FormInput
              name="title"
              label="Title:"
              type="text"
              placeholder="Category Title.."
              id="title"
            />
          </div>
          <div className="input_group">
            <FormInput
              name="description"
              label="Description:"
              textarea
              placeholder="Category Description..."
              id="description"
            />
          </div>
          {isLoading ? <Spinner /> : <button type="submit">Submit</button>}
        </form>
      </FormProvider>
    </div>
  );
};

export default CategoryForm;
