export default interface Restaurant {
  id?: string;
  manager_id: string;
  name: string;
  description: string;
  address: string;
  website?: string;
  email?: string;
  phone: string;
  image: string;
  license_image: string;
  food_list: [];
  open_at?: Date;
  close_at?: Date;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// viet ham validation cho data o day, duoi day t demo thoi
export const restaurant_validation: any = (data: Restaurant) => {
  if(data.name.length > 100) {
    return "ten nha hang dai vl, nhap lai duoi 100 ki tu di bro :v";
  }
  if(data.address.length > 255) {
    return "dia chi nha hang dai vl, nhap lai duoi 255 ki tu di bro :v";
  } 
  return "OK";
}