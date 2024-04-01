export interface IRoute {
  path: string;
  name: string;
  icon: React.ReactNode;
}

export interface IZodError {
  code: string;
  errors: {
    path: string;
    message: string;
  }[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
}

export interface IUsersRequest {
  users: IUser[];
  total: number;
  page: number;
}
