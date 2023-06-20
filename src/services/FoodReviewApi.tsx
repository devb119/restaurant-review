import { firestore } from "../config/firebase";
import FoodReview from "../models/food_reviews";

//create new review for a specific food
export async function createNewFoodReview(review: FoodReview) {
  const newData = await firestore.collection("food_reviews").add(review);
  return await firestore
    .collection("food_reviews")
    .doc(newData.id)
    .update({ ...review, id: newData.id });
}

//get all review about 1 food
export async function getFoodReviewsById(foodId: string) {
  const data = await firestore
    .collection("food_reviews")
    .where("food_id", "==", foodId)
    .orderBy("star", "desc")
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
  }));
}

//update review about food
export async function updateFoodReview(docId: string, review: FoodReview) {
  const updatedData = await firestore.collection("food_reviews").doc(docId);

  updatedData
    .update(review)
    .then(() => {
      console.log("Update successfully!");
    })
    .catch((error) => {
      console.error("Update review failed!", error);
    });
}

//remove food review
export async function deleteFoodReview(docId: string) {
  const removedData = await firestore.collection("food_reviews").doc(docId);

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

export async function getFoodReviewByReviewId(review_id: string) {
  const food_rv_list = await firestore
    .collection("food_reviews")
    .where("review_id", "==", review_id)
    .get();
  return food_rv_list.docs.map((item) => ({
    ...item.data(),
  }));
}
