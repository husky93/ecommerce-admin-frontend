import React from 'react';
import { Item } from '../app/api/types';
import { object, string, number, TypeOf } from 'zod';

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
  price: number().positive('Price must be positive number'),
  num_in_stock: number().int('Number in Stock must be Integer'),
});

export type ItemInput = TypeOf<typeof itemSchema>;

const ItemForm: React.FC<ItemFormProps> = ({ mode }) => {
  return <></>;
};

export default ItemForm;
