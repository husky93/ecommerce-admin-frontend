import React, { useEffect } from 'react';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import Spinner from './loaders/Spinner';
import styles from '../assets/styles/components/ItemForm.module.css';
import { object, string, number, TypeOf, coerce } from 'zod';
import { useQuery } from 'react-query';
import { getCategories, postItem, putItem } from '../app/api/api';
import { ToastContainer } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useFormMutation } from '../app/hooks';

import type { SubmitHandler } from 'react-hook-form';
import type { Item } from '../app/api/types';

interface ItemFormProps {
  mode: 'create' | 'update';
  data: Item;
}

const itemSchema = object({
  title: string()
    .min(1, 'Title is required')
    .max(150, 'Title must have maximum 150 characters'),
  description: string().min(1, 'Description is required'),
  category: string().min(1, 'Category is required'),
  price: coerce.number().positive('Price must be positive number'),
  margin: coerce
    .number()
    .int('Margin must be Integer')
    .min(1, 'Margin must be minimum 1%')
    .max(100, 'Margin must be maximum 100%'),
  num_in_stock: coerce
    .number()
    .min(1, 'Number is required')
    .int('Number in Stock must be Integer'),
});

export type ItemInput = TypeOf<typeof itemSchema>;

const ItemForm: React.FC<ItemFormProps> = ({ mode, data }) => {
  const {
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
    data: categories,
    error,
  } = useQuery('categories', getCategories);

  const apiRequest = mode === 'create' ? postItem : putItem;
  const { mutate, isLoading } = useFormMutation(apiRequest, 'items');

  useEffect(() => {
    reset(data);
  }, [data]);

  const methods = useForm<ItemInput>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: 0,
      margin: 1,
      num_in_stock: 1,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmitHandler: SubmitHandler<ItemInput> = (values) => {
    mutate(values);
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
              placeholder="Item name..."
              id="title"
            />
          </div>
          <div className="input_group">
            <FormInput
              name="description"
              label="Description:"
              textarea
              placeholder="Item description..."
              id="description"
            />
          </div>
          <div className="input_group">
            <SelectInput
              label="Category:"
              name="category"
              error={isCategoriesError}
              options={categories}
            />
          </div>
          <div className="input_group">
            <FormInput
              name="price"
              label="Price: $ (+VAT)"
              placeholder="Price"
              type="number"
              id="price"
            />
          </div>
          <div className="input_group">
            <FormInput
              name="margin"
              label="Margin: %"
              placeholder="1-100"
              type="number"
              id="margin"
            />
          </div>
          <div className="input_group">
            <FormInput
              name="num_in_stock"
              label="Number In Stock:"
              placeholder="100"
              type="number"
              id="num_in_stock"
            />
          </div>
          {isLoading ? <Spinner /> : <button type="submit">Submit</button>}
        </form>
      </FormProvider>
    </div>
  );
};

export default ItemForm;
