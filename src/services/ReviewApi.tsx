import { firestore } from "../config/firebase";
import Review from "../models/reviews";

//demo api
export async function createFoodReview(review: Review) {
    const newData = await firestore.collection("reviews").add(review);
 return await firestore
      .collection("reviews")
      .doc(newData.id)
      .update({ ...review, id:newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
  }
  
export async function getFoodReviewsByReviewId(id: string) {
      const data = await firestore
        .collection("food_reviews")
        .where("review_id", ">=", id)
        .get();
      return data.docs.map((item) => ({
        ...item.data(),
      }));
    }

    export async function addFoodRvToReview(review_id: string, food_rv_list: Array<string>, food_rv_id: string) {
      const newList = food_rv_list.push(food_rv_id);
      return await firestore.collection("reviews").doc(review_id).update({ food_review_list: newList });
    }
    
  export async function getFoodReviewByDocId(docId: string) {
    const data = await firestore.collection("reviews").doc(docId).get();
    return data.data();
  }
