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

export type CategoriesGet = Array<Category>;
