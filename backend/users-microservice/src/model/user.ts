export interface IUser {
  _id: number;
  email: string;
  password: string;
  username?: string;
  created_at?: Date;
}
