export const KEY = "access-token";

export interface IMeta {
  total: number;
  page: number;
  size: number;
}

export interface IResponse {
  data: any;
  meta?: IMeta;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOption {
  value: string;
  label: string;
}

export interface IQuestion {
  id: string;
  category: ICategory;
  categoryId: string;
  correctAnswers: number[];
  explanation: string;
  options: string[];
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUserData {
  name?: string;
  image?: string;
  phone?: string;
  age?: string;
  bio?: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
