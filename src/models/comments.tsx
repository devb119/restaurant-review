export default interface Comment {
    id?: string;
    review_id: string;
    user_id: string;
    content: string;
    created_at?: Date;
    updated_at?: Date;
}

//viet ham validation cho data o day