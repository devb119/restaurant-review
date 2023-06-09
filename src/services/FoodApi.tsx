import { firestore } from "../config/firebase";
import Food from "../models/foods";
// import { faker } from '@faker-js/faker';

//demo api
export async function createFood(food: Food) {
    const newData = await firestore.collection("Foods").add(food);
    return await firestore
      .collection("Foods")
      .doc(newData.id)
      .update({ ...food, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
  }
  
  export async function getFoodsByName(name: string) {
    const data = await firestore
      .collection("Foods")
      .where("name", ">=", name)
      .where("name", "<=", name + "\uf8ff")
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
      // docId: item.id,
    }));
  }
  
    export async function getFoodsByRestaurantId(id: string) {
      const data = await firestore
        .collection("Foods")
        .where("restaurant_id", ">=", id)
        .get();
      return data.docs.map((item) => ({
        ...item.data(),
        // docId: item.id,
      }));
    }
    
  //get by doc id cho no unique
  export async function getFoodByDocId(docId: string) {
    const data = await firestore.collection("Foods").doc(docId).get();
    return data.data();
  }

  export async function getFavouriteFoodList() {
    const data = await firestore.collection("Foods").orderBy('rating', 'desc').limit(10).get();
    return data.docs.map((item) => ({
      ...item.data(),
    }));
  }
