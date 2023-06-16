import { firestore } from "../config/firebase";
import Coupons from "../models/coupons";

//create cmt
export async function createNewCoupon(coupon: Coupons) {
  const newData = await firestore.collection("coupons").add(coupon);
  return await firestore
    .collection("coupons")
    .doc(newData.id)
    .update({ ...coupon, id: newData.id });
}

//get by doc id cho no unique
export async function getCouponByDocId(docId: string) {
  const data = await firestore.collection("coupons").doc(docId).get();
  return data.data();
}

//get all coupons by restaurant id
export async function getCouponsByRestaurantId(restaurantId: string) {
  const data = await firestore
    .collection("coupons")
    .where("restaurant_id", "==", restaurantId)
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
  }));
}

//update coupon infor
export async function updateCoupon(docId: string, coupon: Coupons) {
  const updatedData = await firestore.collection("coupons").doc(docId);

  updatedData
    .update(coupon)
    .then(() => {
      console.log("Update successfully!");
    })
    .catch((error) => {
      console.error("Update coupon failed!", error);
    });
}

//remove coupon

