
export type User = {
  id: string;
  fullName: string;
  profilePicture: string;
  email: string;
  role: string;
};

export type SelectItem = {
  labelEn?: string;
  labelAr?: string;
  label?: string;
  value: string;
  desc?: string;
  icon?: string;
  className?: string;
};
export type Item = {
  nameEn?: string;
  nameAr?: string;
  value: string;
  desc?: string;
  icon?: string;
  className?: string;
};
export type LocalizedItem = {
  id?: string;
  nameEn: string;
  nameAr: string;
};






export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export type CartProduct = {
  productId: number;
  quantity: number;
};

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
};

export type FakeStoreUser = {
  id: number;
  email: string;
  username: string;
  password: string;
  name?: {
    firstname: string;
    lastname: string;
  };
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation?: {
      lat: string;
      long: string;
    };
  };
  phone?: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type SignUpCredentials = {
  username: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};