import { firestore } from "../config/firebase";
import Food_review from "../models/food_reviews";

//demo api
export async function createFoodReview(review: Food_review) {
    const newData = await firestore.collection("food_reviews").add(review);
 return await firestore
      .collection("food_reviews")
      .doc(newData.id)
      .update({ ...review, id:newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
  }
  
    export async function getFoodReviewsByFoodId(id: string) {
      const data = await firestore
        .collection("food_reviews")
        .where("food_id", ">=", id)
        .get();
      return data.docs.map((item) => ({
        ...item.data(),
      }));
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
    
  export async function getFoodReviewByDocId(docId: string) {
    const data = await firestore.collection("food_reviews").doc(docId).get();
    return data.data();
  }
