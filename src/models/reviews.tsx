export default interface Review {
    id?: string;
    restaurant_id: string;
    user_id: string;
    about_space: string;
    about_quality: string;
    other_review: string;
    star: number;
    is_active: boolean,
    created_at?: Date;
    updated_at?: Date;
}

//viet ham validation cho data o day