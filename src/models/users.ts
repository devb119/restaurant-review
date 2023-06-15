import { UserGender, UserRole } from "./enum";
import { validate } from "email-validator";

export interface IUserModel {
  id?: string;
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

// Validate function: return true if every thing is fine else return an error
export function validateUser(
  user: IUserModel,
  password: string,
  passwordConfirm: string
): Error | boolean {
  const minLength = 6;
  const maxLength = 18;
  if (
    user.fullname.length === 0 ||
    user.nationality.length === 0 ||
    user.username.length === 0
  ) {
    throw new Error("Fields must not be empty");
  }
  if (!/^\d+$/.test(user.phone)) {
    throw new Error("Phone number must contain only numbers");
  }
  if (!validate(user.email)) {
    throw new Error("Email is not valid. Please use another email");
  }
  if (password.length > maxLength || password.length < minLength) {
    throw new Error(
      "Password length is not valid. Password should be 6-16 characters"
    );
  }
  if (password !== passwordConfirm) {
    throw new Error("Password doesn't match! Please input again");
  }
  return true;
}
