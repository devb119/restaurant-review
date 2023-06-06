import { firestore } from "../config/firebase";
import Review from "../models/reviews";

//create cmt
export async function createFood(review: Review) {
    const newData = await firestore.collection("reviews").add(review);
    return await firestore
      .collection("reviews")
      .doc(newData.id)
      .update({ ...review, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
  }
  
  //get all cmt by 1 user
  export async function getReviewsByUser(user_id: string) {
    const data = await firestore
      .collection("reviews")
      .where("user_id", "==", user_id)
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