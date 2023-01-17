import axios from 'axios';
import type {
  UserPost,
  LoginInput,
  CategoriesGet,
  Category,
  CategoryInput,
  Item,
  ItemInput,
  ItemsGet,
  Transaction,
  TransactionsGet,
  User,
} from './types';
const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_PROD_API_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const loginUser = async (user: LoginInput) => {
  const response = await authApi.post<UserPost>('auth/login', user);
  return response.data;
};

export const getCategories = async () => {
  const response = await authApi.get<CategoriesGet>('categories');
  return response.data;
};

export const getCategory = async (id: string | undefined) => {
  if (id) {
    const response = await authApi.get<Category>(`categories/${id}`);
    return response.data;
  }
};

export const postCategory = async (
  token: string | undefined,
  category: CategoryInput
) => {
  if (token) {
    const response = await authApi.post<Category>('categories', category, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};

export const putCategory = async (
  token: string | undefined,
  id: string | undefined,
  updatedCategory: CategoryInput
) => {
  if (id && token) {
    const response = await authApi.put<Category>(
      `categories/${id}`,
      updatedCategory,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
};

export const deleteCategory = async (
  token: string | undefined,
  id: string | undefined
) => {
  if (id && token) {
    const response = await authApi.delete<Category>(`categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};

export const getItems = async () => {
  const response = await authApi.get<ItemsGet>('items');
  return response.data;
};

export const getItem = async (id: string | undefined) => {
  if (id) {
    const response = await authApi.get<Item>(`items/${id}`);
    return response.data;
  }
};

export const postItem = async (token: string | undefined, item: ItemInput) => {
  if (token) {
    const bodyFormData = new FormData();
    for (const [key, value] of Object.entries(item)) {
      if (key === 'cover_img') bodyFormData.append(key, value[0]);
      else bodyFormData.append(key, value);
    }
    const response = await authApi.post<Item>('items', bodyFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export const putItem = async (
  token: string | undefined,
  id: string | undefined,
  updatedItem: ItemInput
) => {
  if (id && token) {
    const response = await authApi.put<Item>(`items/${id}`, updatedItem, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};

export const deleteItem = async (
  token: string | undefined,
  id: string | undefined
) => {
  if (id && token) {
    const response = await authApi.delete<Item>(`items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};

export const getTransactions = async (
  token: string | undefined,
  recent?: boolean
) => {
  if (token) {
    const response = await authApi.get<TransactionsGet>(
      `transactions${recent ? `?recent="true"` : ''}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
};

export const getTransaction = async (
  token: string | undefined,
  id: string | undefined
) => {
  if (id && token) {
    const response = await authApi.get<Transaction>(`transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};

export const putTransaction = async (
  token: string | undefined,
  id: string | undefined,
  updatedData: Transaction
) => {
  if (id && token) {
    const response = await authApi.put<Transaction>(
      `transactions/${id}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
};

export const getUser = async (
  token: string | undefined,
  id: string | undefined
) => {
  if (id && token) {
    const response = await authApi.get<User>(`transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};
