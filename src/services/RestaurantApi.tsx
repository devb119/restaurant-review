import { firestore } from "../config/firebase";
// import Food from "../models/foods";
import Restaurant from "../models/restaurants";
import { faker } from '@faker-js/faker';
import Food from "../models/foods";

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

export async function getRestaurants(pageNum: number, numPerPage: number) {
  const data = await firestore
    .collection("restaurants")
    .where("is_active","!=", false)
    .orderBy('is_active')
    .orderBy('name')
    .limit((pageNum + 1) * numPerPage)
    .get();
  const allData = data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
  if (allData.length < numPerPage) {
    return allData
  } else {
    return allData.splice(pageNum * numPerPage, numPerPage);
  }
}

//get by doc id cho no unique
export async function getRestaurantByDocId(docId: string) {
  const data = await firestore.collection("restaurants").doc(docId).get();
  return data.data();
}

export async function getFoodsByRestaurant(foodList: Array<string>) {
  const data = await firestore
    .collection("Foods")
    .where("id", "in", foodList)
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

export async function addMenuToRestaurant(restaurantId: string, restaurantFoodId: string[], foodIds: string[]) {
  for(let i = 0; i < foodIds.length; i++) {
    if(!restaurantFoodId.includes(foodIds[i])){
      restaurantFoodId.push(foodIds[i]);
    }
  }
  return await firestore.collection("restaurants").doc(restaurantId).update({ food_list: restaurantFoodId });
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
export async function updateRestaurantInfo(docId: string, restaurantInfo: Restaurant) {
  const updatedData = await firestore
  .collection("restaurants")
  .doc(docId);

  updatedData.update(restaurantInfo).then(() => {
    console.log("Update successfully!");
  })
  .catch((error) => {
    console.error("Update review failed!", error);
  })
}

//remove restaurant
export async function deleteRestaurant(docId: string) {
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


export async function getRestaurantsByFoodName(name : string) {
  const data = await firestore 
    .collection('Foods')
    .orderBy('rating', 'desc')
    .get()

  // const foodData = data.docs.filter((item) => item.data.name.toLowerCase().includes(name.trim().toLowerCase()));
  const foodData = data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
  const filterFoodData = foodData.filter((item) => item.name.toLowerCase().includes(name.trim().toLowerCase()));
  return filterFoodData.map((e) => {
    return e.restaurant_id.trim();
  })
}
