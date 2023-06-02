import { firestore } from "../config/firebase";
import Restaurant from "../models/restaurants";

//demo api
export async function createRestaurant(restaurant: Restaurant) {
  const newData = await firestore.collection("restaurant").add(restaurant);
  return await firestore
    .collection("restaurant")
    .doc(newData.id)
    .update({ ...restaurant, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
}

//get all by 1 ca1 gi do ko unique
export async function getRestaurantsByName(name: string) {
  const data = await firestore
    .collection("restaurant")
    .where("name", ">=", name)
    .where("name", "<=", name + "\uf8ff")
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
}

//get by doc id cho no unique
export async function getRestaurantByDocId(docId: string) {
  const data = await firestore.collection("restaurant").doc(docId).get();
  return data.data();
}

export async function getFoodsByRestaurant(food_list: Array<string>) {
  const data = await firestore
    .collection("restaurant")
    .where("id", "in", food_list)
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
  }));
}