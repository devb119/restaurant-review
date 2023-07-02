import { validate } from "email-validator";
export default interface Restaurant {
  id?: string;
  manager_id: string;
  name: string;
  description: string;
  address: string;
  website?: string;
  email: string;
  phone: string;
  image: string;
  license_image: string;
  food_list: [];
  open_at?: string;
  close_at?: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
  rating: number;
}

// viet ham validation cho data o day, duoi day t demo thoi
export const validateRestaurant = (restaurant: Restaurant): Error | boolean => {
  if (
    restaurant.name.length === 0 ||
    restaurant.address.length === 0 ||
    restaurant.description.length === 0 ||
    restaurant.phone.length === 0
  ) {
    throw new Error(
      "レストラン名、アドレス、電話番号、説明、フィールドは空であってはなりません"
    );
  }
  if (!/^\d+$/.test(restaurant.phone)) {
    throw new Error("電話番号には数字のみを含める必要があります");
  }
  if (!validate(restaurant.email)) {
    throw new Error(
      "電子メールが無効です。 別のメールアドレスを使用してください"
    );
  }
  return true;
};
