import { useEffect, useState } from "react";
import Restaurant from "../../models/restaurants";
import { useParams } from "react-router-dom";
import { getRestaurantByDocId } from "../../services/RestaurantApi";
import { Loading } from "../../components/common";
import { HiOutlineLocationMarker } from "react-icons/hi";
import CouponList from "./CouponList";
import Coupon from "../../models/coupons";
import AppealFood from "./AppealFood";
import Food from "../../models/foods";
import { getFoodsByRestaurantId } from "../../services/FoodApi";
import { getCouponsByRestaurantId } from "../../services/CouponApi";
import ReviewSection from "./ReviewSection";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createPortal } from 'react-dom';
import { UserRole } from "../../models/enum";
import React from "react";
import { getReviewsByRestaurantId } from "../../services/ReviewApi";

const noti = document.getElementById('noti')!;

function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState<boolean>(true);
  const [appealFood, setAppealFood] = useState<Food[]>();
  const [couponLists, setCouponLists] = useState<Coupon[]>();
  const user = useSelector((state: RootState) => state.user.user);
  const [rating, setRating] = useState(0);

  React.useEffect(() => {
    async function getAverageRating() {
        const data : any = await getReviewsByRestaurantId(id ? id : "");
        console.log(data);
        let totalRating = 0;
        for(let i = 0; i < data.length ; i++) {
          totalRating += data[i].star;
        }
        const averageRating = parseFloat((totalRating / data.length).toFixed(1)) || 0;
        setRating(averageRating);
        
    }
    getAverageRating();
}, [])

  const id = useParams().id || "";
  useEffect(() => {
    Promise.all([
      getRestaurantByDocId(id ),
      getFoodsByRestaurantId(id ),
      getCouponsByRestaurantId(id ),
    ])
      .then((res) => {
        if (res) {
          setRestaurant(res[0]);
          setAppealFood(res[1] as Food[]);
          setCouponLists(res[2] as Coupon[]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  if (!restaurant) return <></>;
  const { name, address, description, image } = restaurant;
  
  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
         
         
          
          <div className="m-12 ">
            
            <div className="flex justify-center items-center m-12 -mt-8 mb-12 ">
              <h2 className="font-bold text-3xl">
                {restaurant.name} レストランの情報
              </h2>
            </div>
            <div className="h-600 w-full flex justify-center">
              <img className="rounded-3xl h-600 w-full" src={image}></img>
            </div>
            <div className="mt-4 flex gap-1">
              <h2 className="font-bold text-xl">{name}</h2>
              <div className="flex items-center gap-2 ml-2">
                <p className="text-xl">{rating}</p>
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 60 64"
                  fill="#FFBA00"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer inline"
                >
                  <path
                    d="M31.3877 54.3698C30.3605 53.7883 29.1514 53.7883 28.1242 54.3698L14.9591 61.8221C12.1709 63.4004 9.03152 60.5493 9.78758 57.1254L12.8658 43.1853C13.1602 41.8524 12.8499 40.4411 12.0381 39.42L1.87657 26.6373C-0.148955 24.0893 1.28987 20.0181 4.3088 19.7551L18.4844 18.5206C19.8104 18.4051 20.9759 17.482 21.5262 16.1113L26.4342 3.88686C27.7305 0.658161 31.7813 0.658155 33.0776 3.88685L37.9856 16.1113C38.5359 17.482 39.7014 18.4051 41.0274 18.5206L55.203 19.7551C58.222 20.0181 59.6608 24.0893 57.6353 26.6373L47.4737 39.42C46.6619 40.4411 46.3517 41.8524 46.646 43.1853L49.7242 57.1254C50.4803 60.5493 47.3409 63.4004 44.5527 61.8221L31.3877 54.3698Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex my-2">
              <span className="text-xl font-thin text-mainShade">
                <HiOutlineLocationMarker className="yellow" />
              </span>
              <p className="pl-1 font-thin">{address}</p>
            </div>
            <div className="mx-4 bg-white rounded-md">
              <p className="m-8 p-4"> {description}</p>
            </div>
            {couponLists && couponLists.length != 0 && (
              <div>
                <CouponList couponLists={couponLists}></CouponList>
              </div>
            )}

            {appealFood && appealFood.length != 0 && (
              <div className="mb-[8rem]">
                <AppealFood foodLists={appealFood}></AppealFood>
              </div>
            )}

            <ReviewSection id={id || ""} />
            {}
            {user ? null : (
              <div className="w-full text-center border-t-2 border-slate-300 pt-4">
                <Link to="/auth/login">
                  レビューを追加するためにログインしてください
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
    
  );
}

export default RestaurantDetail;
