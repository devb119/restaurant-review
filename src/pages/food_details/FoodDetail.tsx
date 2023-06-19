import React, { useEffect, useState } from "react";
import Restaurant from "../../models/restaurants";
import { useParams } from "react-router-dom";
import { getFoodByDocId } from "../../services/FoodApi";
import { Loading } from "../../components/common";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Food from "../../models/foods";
import { getFoodsByRestaurantId } from "../../services/FoodApi";
import { getCouponsByRestaurantId } from "../../services/CouponApi";
import FoodReviewSection from "./FoodReviewSection";
function RestaurantDetail() {
  const [food, setFood] = useState<Food>();
  //   const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState<boolean>(true);
  const [appealFood, setAppealFood] = useState<Food[]>();

  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    Promise.all([getFoodByDocId(id || "")])
      .then((res) => {
        if (res) {
          setFood(res[0] as Food);
          //   setAppealFood(res[1] as Food[]);
          //   setCouponLists(res[2] as Coupon[])
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  if (!food) return <></>;
  const { name, description, image } = food;
  return (
    <div className="bg-white">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="m-12 p-12">
          <div className="rounded-3xl shadow-2xl text-center">
            <div className="h-600 w-full flex">
              <img className="rounded-3xl h-600 w-full" src={image}></img>
            </div>
            <div className="mt-4 w-full">
              <h2 className="font-black text-3xl">{name}</h2>
            </div>
            <div className="mx-4 bg-white rounded-md">
              <p className="m-8 p-4 text-xl"> {description}</p>
            </div>
          </div>

          <FoodReviewSection />
        </div>
      )}
    </div>
  );
}

export default RestaurantDetail;
