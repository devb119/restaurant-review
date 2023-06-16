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
        .where("restaurant_id", "==", id)
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
//   export async function generateDummyFood(n: number) {
//     for(let i = 0; i < n; i++) {
//        createFood({name: faker.animal.dog(), description: faker.animal.dog(), restaurant_id: '', image: faker.image.avatar(), price: faker.finance.amount(), created_at: new Date(Date.now()), updated_at: new Date(Date.now())});
//     }
//  }

//update food information
export async function updateFood(docId: string, food: Food) {
  const updatedData = await firestore
  .collection("Foods")
  .doc(docId);

  updatedData.update(food).then(() => {
    console.log("Update successfully!");
  })
  .catch((error) => {
    console.error("Update review failed!", error);
  })
}

//remove food
export async function deleteFood(docId: string) {
  const removedData = await firestore
  .collection("Foods")
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