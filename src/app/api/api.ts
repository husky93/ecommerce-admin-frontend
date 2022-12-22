import axios from 'axios';
import type {
  UserPost,
  LoginInput,
  CategoriesGet,
  Category,
  CategoryInput,
  Item,
  ItemsGet,
  Transaction,
  TransactionsGet,
} from './types';
const BASE_URL = 'https://express-shop-api-production.up.railway.app/';

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes('not logged in') && !originalRequest._retry) {
      originalRequest._retry = true;
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

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
  category: CategoryInput,
  token: string | undefined
) => {
  if (token) {
    const response = await authApi.post<Category>('categories', category, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
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

export const getTransactions = async (token: string | undefined) => {
  if (token) {
    const response = await authApi.get<TransactionsGet>('transactions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};

export const getTransaction = async (
  id: string | undefined,
  token: string | undefined
) => {
  if (id && token) {
    const response = await authApi.get<Transaction>(`transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};
