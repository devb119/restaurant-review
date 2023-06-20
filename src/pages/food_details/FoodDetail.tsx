import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodByDocId } from "../../services/FoodApi";
import { Loading } from "../../components/common";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Food from "../../models/foods";
import FoodReviewSection from "./FoodReviewSection";

function RestaurantDetail() {
  const [food, setFood] = useState<Food>();
  //   const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    Promise.all([getFoodByDocId(id || "")])
      .then((res) => {
        if (res) {
          setFood(res[0] as Food);
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
  const { name, description, image, restaurant_id } = food;
  return (
    <div className="bg-white w-[70%] mx-auto rounded-3xl">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="w-[90%] mx-auto py-20">
          <div className="rounded-3xl text-center">
            <div className="h-600 w-full flex">
              <img className="rounded-3xl h-600 w-full" src={image}></img>
            </div>
            <div className="mt-4 w-full">
              <h2 className="font-black mt-8 text-3xl">{name}</h2>
            </div>
            <div className="mx-4 bg-white rounded-md">
              <p className="p-4 text-xl"> {description}</p>
            </div>
          </div>

          <FoodReviewSection id={id} />
          <AiOutlineArrowLeft
            onClick={() => {
              navigate(`/restaurants/${restaurant_id}`);
            }}
            className="fixed top-24 right-10 text-5xl text-main cursor-pointer hover:text-gray"
          />
        </div>
      )}
    </div>
  );
}

export default RestaurantDetail;
