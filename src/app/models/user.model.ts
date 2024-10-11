export interface User {
  _id?: string;
  password?: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  hireDate: Date;
  isActive: boolean;
}