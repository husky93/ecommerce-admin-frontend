export interface UserPost {
  user: {
    name: string;
    surname: string;
    address: {
      city: string;
      zip_code: string;
      street: string;
      house_num: string;
    };
    _id: string;
    username: string;
    __v: number;
    isAdmin: boolean;
  };
  token: string;
}

export interface User {
  name: string;
  surname: string;
  address: {
    city: string;
    zip_code: string;
    street: string;
    house_num: string;
  };
  _id: string;
  username: string;
  __v: number;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface Category {
  _id: string;
  title: string;
  description: string;
  __v: number;
}

export interface CategoryInput {
  title: string;
  description: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  profit: number;
  price_gross: number;
  margin: number;
  num_in_stock: number;
  __v: number;
}

export interface ItemInput {
  title: string;
  description: string;
  category: string;
  price: number;
  num_in_stock: number;
}

export interface TransactionItem {
  item: Item;
  quantity: number;
}

export interface Transaction {
  _id: string;
  user: User;
  items: Array<TransactionItem>;
  status: 'pending' | 'delivered' | 'payment failed' | 'cancelled' | 'paid';
  __v: number;
}

export interface TransactionInput {
  user: User;
  items: Array<TransactionItem>;
  status: 'pending' | 'delivered' | 'payment failed' | 'cancelled' | 'paid';
}

export type PostApiRequest = (
  token: string | undefined,
  data: any
) => Promise<Category | Item | undefined>;

export type PutApiRequest = (
  token: string | undefined,
  id: string | undefined,
  data: any
) => Promise<Category | Item | Transaction | undefined>;

export type DeleteApiRequest = (
  token: string | undefined,
  id: string | undefined
) => Promise<Category | Item | Transaction | undefined>;

export type CategoriesGet = Array<Category>;

export type ItemsGet = Array<Item>;

export type TransactionsGet = Array<Transaction>;
