import { UserCouponStatus } from "./enum";

export default interface User_coupon {
    user_id?: string;
    coupon_id: string;
    amount: number;
    got_at?: Date;
    status: UserCouponStatus;
}

//viet ham validation cho data o day