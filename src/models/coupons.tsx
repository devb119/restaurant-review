import { CouponStatus } from "./enum";

export default interface Coupons {
    id?: string;
    restaurant_id: string;
    name: string;
    description: string;
    sale: number;
    point: number;
    quantity: number;
    expired_at: Date,
    status: CouponStatus;
    image: string;
    created_at?: Date;
    updated_at?: Date;
}

//viet ham validation cho data o day