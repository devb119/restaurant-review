import { firestore } from "../config/firebase";
import Review from "../models/reviews";

//create cmt
export async function createNewReview(review: Review) {
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

  //get all comments by restaurant id
  export async function getReviewsByRestaurantId(restaurant_id: string) {
    const data = await firestore
      .collection("reviews")
      .where("restaurant_id", "==", restaurant_id)
      .orderBy("star", "desc")
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
    }));
  }

  //update review
  export async function updateReview(docId: string, review: Review) {
    const updatedData = await firestore
    .collection("reviews")
    .doc(docId);

    updatedData.update(review).then(() => {
      console.log("Update successfully!");
    })
    .catch((error) => {
      console.error("Update review failed!", error);
    })
  }

  //remove review
  export async function deleteReview(docId: string) {
    const removedData = await firestore
    .collection("reviews")
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