import { firestore } from "../config/firebase";
import { UserRole } from "../models/enum";
import Restaurant from "../models/restaurants";
import { faker } from "@faker-js/faker";

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
    .orderBy("created_at", "desc")
    // .where("name", ">=", name)
    // .where("name", "<=", name + "\uf8ff")
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    created_at: new Date(item.data().created_at.seconds * 1000),
    // docId: item.id,
  }));
}

//get active restaurants
export async function getActiveRestaurants() {
  const data = await firestore
    .collection("restaurants")
    .where("is_active", "==", true)
    .orderBy("rating", "desc")
    .get();

  return data.docs.map((item) => ({
    ...item.data(),
    created_at: new Date(item.data().created_at.seconds * 1000)
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

export async function getRestaurantByManagerId(managerId: string) {
  const data = await firestore
    .collection("restaurants")
    .where("manager_id", "==", managerId)
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
  }))[0] as unknown as Restaurant;
}

export async function getRestaurants(pageNum: number, numPerPage: number) {
  const data = await firestore
    .collection("restaurants")
    .where("is_active", "!=", false)
    .orderBy("is_active")
    .orderBy("name")
    .limit((pageNum + 1) * numPerPage)
    .get();
  const allData = data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
  if (allData.length < numPerPage) {
    return allData;
  } else {
    return allData.splice(pageNum * numPerPage, numPerPage);
  }
}

//get by doc id cho no unique
export async function getRestaurantByDocId(docId: string) {
  const data = await firestore.collection("restaurants").doc(docId).get();
  return data.data() as Restaurant;
}

export async function getFoodsByRestaurant(foodList: Array<string>) {
  const list = [];
  for(let i = 0; i< foodList.length; i++) {
    const data = await firestore
    .collection("Foods")
    .doc(foodList[i])
    .get();
    list.push(data.data());
  }
  console.log(list);
  return list;
}

export async function generateDummyRestaurant(n: number) {
  for (let i = 0; i < n; i++) {
    createRestaurant({
      name: faker.company.name(),
      description: faker.company.name(),
      manager_id: "1",
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      phone: faker.phone.imei(),
      image: faker.image.avatar(),
      is_active: true,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
      food_list: [],
      license_image: "",
      website: faker.internet.domainName(),
      rating: 0,
    });
  }
}

export async function addMenuToRestaurant(
  restaurantId: string,
  restaurantFoodId: string[],
  foodIds: string[]
) {
  for (let i = 0; i < foodIds.length; i++) {
    if (!restaurantFoodId.includes(foodIds[i])) {
      restaurantFoodId.push(foodIds[i]);
    }
  }
  return await firestore
    .collection("restaurants")
    .doc(restaurantId)
    .update({ food_list: restaurantFoodId });
}

export async function updateRestaurant(restaurant: Restaurant) {
  return await firestore
    .collection("restaurants")
    .doc(restaurant.id)
    .update(restaurant);
}

export function deleteAllCollection(path: string) {
  const ref = firestore.collection(path);
  ref.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      ref.doc(doc.id).delete();
    });
  });
}



//update restaurant info
export async function updateRestaurantInfo(
  docId: string | undefined,
  restaurantInfo: Restaurant,
  user_role: UserRole
) {
  if(user_role === UserRole.Admin)  {
  const updatedData = await firestore.collection("restaurants").doc(docId);

  updatedData
    .update(restaurantInfo)
    .then(() => {
      console.log("Update successfully!");
    })
    .catch((error) => {
      console.error("Update review failed!", error);
    });
  }
  else return new Error("Only Admin can update the restaurant's info");
}

//remove restaurant
export async function deleteRestaurant(docId: string) {
  const removedData = await firestore.collection("restaurants").doc(docId);

  removedData
    .get()
    .then((doc) => {
      if (doc.exists) {
        removedData
          .delete()
          .then(() => {
            console.log("Delete successfully!");
          })
          .catch((error) => {
            console.error("Update review failed!", error);
          });
      } else {
        console.log("Data is not existed!");
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

export async function getRestaurantIdsByFoodName(name: string) {
  const data = await firestore
    .collection("Foods")
    .orderBy("rating", "desc")
    .get();

  const foodData = data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
  const filterFoodData = foodData.filter((item) =>
    item.name.toLowerCase().includes(name.trim().toLowerCase())
  );

  const restaurantIdList = filterFoodData.map((e) => {
    return e.restaurant_id.trim();
  });

  return restaurantIdList;
}
