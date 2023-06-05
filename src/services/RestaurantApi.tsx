import { firestore } from "../config/firebase";
import Restaurant, { restaurant_validation } from "../models/restaurants";
import { faker } from '@faker-js/faker';

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

export async function generateDummyRestaurant(n: number) {
   for(let i = 0; i < n; i++) {
      createRestaurant({name: faker.company.name(), description: faker.company.name(), manager_id: '1', address: faker.location.streetAddress(), email: faker.internet.email(), phone: faker.phone.imei(), image: faker.image.avatar(), is_active: false, created_at: new Date(Date.now()), updated_at: new Date(Date.now()), food_list: [], license_image: '', website: faker.internet.domainName()});
   }
}

export function deleteAllCollection(path : string) {
  const ref = firestore.collection(path)
  ref.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      ref.doc(doc.id).delete();
    })
  })
}