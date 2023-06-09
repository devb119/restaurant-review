import { UserGender, UserRole } from "./enum";

export interface IUserModel {
  id?: number;
  username: string;
  fullname: string;
  gender: UserGender;
  email: string;
  phone: string;
  nationality: string;
  point: number;
  image?: string;
  role: UserRole;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
