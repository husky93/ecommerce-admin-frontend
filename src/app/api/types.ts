export interface UserPost {
  user: {
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

export interface Item {
  _id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  num_in_stock: number;
  __v: number;
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

export type CategoriesGet = Array<Category>;

export type ItemsGet = Array<Item>;
