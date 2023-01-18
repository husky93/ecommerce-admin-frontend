import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import FileInput from './FileInput';
import Spinner from './loaders/Spinner';
import ImageRemover from './ImageRemover';
import styles from '../assets/styles/components/ItemForm.module.css';
import { object, string, TypeOf, coerce, any } from 'zod';
import { useQuery } from 'react-query';
import { getCategories, postItem, putItem } from '../app/api/api';
import { ToastContainer } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useFormMutation } from '../app/hooks';

import type { SubmitHandler } from 'react-hook-form';
import type { Item } from '../app/api/types';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

interface ItemFormProps {
  mode: 'create' | 'update';
  data?: Item;
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

const itemSchemaImage = object({
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
  cover_img: any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

export type ItemInput = TypeOf<typeof itemSchemaImage | typeof itemSchema>;

const ItemForm: React.FC<ItemFormProps> = ({ mode, data }) => {
  const [img, setImg] = useState('');
  const {
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
    data: categories,
    error,
  } = useQuery('categories', getCategories);

  const apiRequest = mode === 'create' ? postItem : putItem;
  const { mutate, isLoading } = useFormMutation(apiRequest, 'items');

  useEffect(() => {
    if (data) {
      const {
        title,
        description,
        category,
        price,
        margin,
        num_in_stock,
        cover_img,
      } = data;
      reset({
        title,
        description,
        category: category._id,
        price,
        margin,
        num_in_stock,
        cover_img,
      });
      setImg(data.cover_img);
    }
  }, [data]);

  const methods = useForm<ItemInput>({
    resolver: zodResolver(img ? itemSchema : itemSchemaImage),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      cover_img: undefined,
      price: 0,
      margin: 1,
      num_in_stock: 1,
    },
  });

  const { handleSubmit, reset, register } = methods;

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
          <div className="input_group">
            {img && <ImageRemover img={img} removeHandler={setImg} />}
            <FileInput
              name="cover_img"
              img={img}
              register={register}
              label="Upload image:"
              accept="image/jpg, image/png, image/webp"
              id="cover_img"
            />
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <button type="submit" className="btn-primary">
              Submit
            </button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default ItemForm;
