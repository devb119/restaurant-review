import { useEffect, useState } from "react";
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
    <div className="bg-white w-[70%] mx-auto rounded-3xl relative">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="w-[90%] mx-auto py-20">
          <div className="rounded-3xl text-center">
            <AiOutlineArrowLeft
              onClick={() => {
                navigate(`/restaurants/${restaurant_id}`);
              }}
              className="text-3xl -mt-12 text-main cursor-pointer hover:fill-[#b32e01]"
            />
            <div className="mb-4 w-full">
              <h2 className="mt-4 text-4xl font-bold">{name}</h2>
            </div>
            <div className="h-600 w-full flex mb-10">
              <img className="rounded-3xl h-600 w-full" src={image}></img>
            </div>

            <div className=" text-2xl font-bold text-left mb-4">ディスクリプション:</div>
            <div className="p-4 bg-slate-200 rounded-3xl mb-10">
              
              <p className="text-left"> {description}</p>
            </div>
          </div>
          <div className=" text-2xl font-bold text-left mb-[-1rem]">レビュー:</div>

          <FoodReviewSection id={id} />
        </div>
      )}
    </div>
  );
}

export default RestaurantDetail;
