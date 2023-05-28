import { firebase, firestore } from "../config/firebase";

//test api
export async function createRestaurant(restaurant: any) {
   return await firestore.collection('restaurant').add(restaurant);
}