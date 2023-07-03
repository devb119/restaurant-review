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

export async function getManagerNameByRestaurantID(id: string) {
  const data = await firestore
    .collection("restaurants")
    .where("id", "==", id)
    .get();
  let manager_id = data.docs.map((item) => ({
    ...item.data().manager_id,
  }))[0];
  manager_id = Object.values(manager_id).join("");
  // console.log(manager_id);
  const user = await firestore.collection("users").where("id", "==", manager_id).get();
  let fullName = user.docs.map((item) => ({
    ...item.data().fullname
  }))[0];
  fullName = Object.values(fullName).join("");
  // console.log(fullName);
  return fullName;
}