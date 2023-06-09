import { firestore } from "../config/firebase";
// import Food from "../models/foods";
import Restaurant from "../models/restaurants";
import { faker } from '@faker-js/faker';

//demo api
export async function createRestaurant(restaurant: Restaurant) {
  const newData = await firestore.collection("restaurants").add(restaurant);
  return await firestore
    .collection("restaurants")
    .doc(newData.id)
    .update({ ...restaurant, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
}

//get all by 1 ca1 gi do ko unique
export async function getRestaurantsByName(name: string) {
  const data = await firestore
    .collection("restaurants")
    .orderBy("rating", "desc")
    // .where("name", ">=", name)
    // .where("name", "<=", name + "\uf8ff")
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
}

export async function getRestaurantById(id: string) {
  const data = await firestore
    .collection("restaurants")
    .where("id", ">=", id)
    .get();
   return data.docs.map((item) => ({
     ...item.data(),
   }))[0];
}

export async function getRestaurants(page_num: number, num_per_page: number) {
  const data = await firestore
    .collection("restaurants")
    .where("is_active","!=", false)
    .orderBy('is_active')
    .orderBy('name')
    .limit((page_num + 1) * num_per_page)
    .get();
  const allData = data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
  if (allData.length < num_per_page) {
    return allData
  } else {
    return allData.splice(page_num * num_per_page, num_per_page);
  }
}

//get by doc id cho no unique
export async function getRestaurantByDocId(docId: string) {
  const data = await firestore.collection("restaurants").doc(docId).get();
  return data.data();
}

export async function getFoodsByRestaurant(food_list: Array<string>) {
  const data = await firestore
    .collection("Foods")
    .where("id", "in", food_list)
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
  }));
}

export async function generateDummyRestaurant(n: number) {
   for(let i = 0; i < n; i++) {
      createRestaurant({name: faker.company.name(), description: faker.company.name(), manager_id: '1', address: faker.location.streetAddress(), email: faker.internet.email(), phone: faker.phone.imei(), image: faker.image.avatar(), is_active: true, created_at: new Date(Date.now()), updated_at: new Date(Date.now()), food_list: [], license_image: '', website: faker.internet.domainName(), rating: 0});
   }
}

export async function addMenuToRestaurant(restaurant_id: string, restaurant_food_list: string[], food_ids: string[]) {
  for(let i = 0; i < food_ids.length; i++) {
    if(!restaurant_food_list.includes(food_ids[i])){
      restaurant_food_list.push(food_ids[i]);
    }
  }
  return await firestore.collection("restaurants").doc(restaurant_id).update({ food_list: restaurant_food_list });
}

export async function updateRestaurant(restaurant: Restaurant) {
  return await firestore.collection("restaurants").doc(restaurant.id).update(restaurant);
}

export function deleteAllCollection(path : string) {
  const ref = firestore.collection(path)
  ref.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      ref.doc(doc.id).delete();
    })
  })
}

//get active restaurants
export async function getActiveRestaurants() {
  const data = await firestore
    .collection("restaurants")
    .where("is_active","!=", false)
    .orderBy("rating", "desc")
    .get();
  
  return data.docs.map((item) => ({
    ...item.data(),
  }));
}

//update restaurant info
export async function updateFoodReview(docId: string, res_info: Restaurant) {
  const updatedData = await firestore
  .collection("restaurants")
  .doc(docId);

  updatedData.update(res_info).then(() => {
    console.log("Update successfully!");
  })
  .catch((error) => {
    console.error("Update review failed!", error);
  })
}

//remove restaurant
export async function deleteFoodReview(docId: string) {
  const removedData = await firestore
  .collection("restaurants")
  .doc(docId);

  removedData.get().then((doc) => {
      if (doc.exists) {
      removedData.delete().then(() => {
          console.log("Delete successfully!");
      })
      .catch((error) => {
          console.error("Update review failed!", error);
      });
      } else {
      console.log("Data is not existed!");
      }
  }).catch((error) => {
      console.error("Error: ", error);
  })    
}