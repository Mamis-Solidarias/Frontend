export default interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  salary: string;
  isActive: boolean;
}

export interface UserNoId {
  name: string;
  email: string;
  phone: string;
  salary: string;
  isActive: boolean;
}

export interface UsersHttp {
  users: User[];
  totalPages: number;
  page: number;
  entries: number;
}
