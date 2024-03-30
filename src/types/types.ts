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
