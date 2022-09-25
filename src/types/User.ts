export default interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface UserNoId {
  name: string;
  email: string;
  phone: string;
  salary?: string;
  isActive?: boolean;
  password?: string;
}

export interface UsersHttp {
  users: User[];
  totalPages: number;
  page: number;
  entries: number;
}
