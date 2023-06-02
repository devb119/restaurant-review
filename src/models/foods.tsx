export default interface Food {
    id?: string;
    restaurant_id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    created_at?: Date;
    updated_at?: Date;
}

//viet ham validation cho data o day