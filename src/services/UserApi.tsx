import { firestore } from "../config/firebase";
import { IUserModel } from "../models";
import { deleteFoodReview } from "./FoodReviewApi";

//create cmt
export async function createNewReview(review: Review) {
  const newData = await firestore.collection("reviews").add(review);
  return await firestore
    .collection("reviews")
    .doc(newData.id)
    .update({ ...review, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
}