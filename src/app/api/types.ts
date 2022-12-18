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
