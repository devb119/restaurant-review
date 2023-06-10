import { firestore } from "../config/firebase";
import Review from "../models/reviews";
import { deleteFoodReview } from "./FoodReviewApi";

//create cmt
export async function createNewReview(review: Review) {
  const newData = await firestore.collection("reviews").add(review);
  return await firestore
    .collection("reviews")
    .doc(newData.id)
    .update({ ...review, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
}

//get all cmt by 1 user
export async function getReviewsByUser(userId: string) {
  const data = await firestore
    .collection("reviews")
    .where("user_id", "==", userId)
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
}

//get by doc id cho no unique
export async function getReviewByDocId(docId: string) {
  const data = await firestore.collection("reviews").doc(docId).get();
  return data.data();
}

//get all comments by restaurant id
export async function getReviewsByRestaurantId(restaurantId: string) {
  const data = await firestore
    .collection("reviews")
    .where("restaurant_id", "==", restaurantId)
    .orderBy("star", "desc")
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
  }));
}

//update review
export async function updateReview(docId: string, review: Review) {
  const updatedData = await firestore.collection("reviews").doc(docId);

  updatedData
    .update(review)
    .then(() => {
      console.log("Update successfully!");
    })
    .catch((error) => {
      console.error("Update review failed!", error);
    });
}

//remove review
export async function deleteReview(
  docId: string,
  food_review_list: Array<string>
) {
  const removedData = await firestore.collection("reviews").doc(docId);
  let removed: any;
  removedData
    .get()
    .then(async (doc) => {
      if (doc.exists) {
      removed = await removedData
          .delete()
          .then(() => {
            food_review_list.map(async (food_rv_id) => {
              await deleteFoodReview(food_rv_id).catch((err) => console.error(err));
            });
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
  Promise.all([removed]).then(() => {
    console.log("Review deleted !");
  })
}
