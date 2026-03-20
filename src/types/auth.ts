export interface IUser {
  _id?: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUserPayload {
  userId: string;
  email: string;
}