import { FaHeart, FaRegComment } from "react-icons/fa";
import { useState } from "react";
import { FiHeart, FiHelpCircle } from "react-icons/fi";
import FoodReview from "../models/food_reviews";
import Review from "../models/reviews";

interface Props {
  type: string;
  foodReview: FoodReview | null;
  review: Review | null;
}

const CommentCard = (props: Props) => {
  const [like, setLike] = useState(false);
  const ratingArray = Array(5).fill(0);
  const ratingValue =
    props.type === "restaurant" ? props.review?.star : props.foodReview?.star;
  return (
    <div className="flex flex-col justify-center mb-10">
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 mt-8">
          <img
            className="w-24 rounded-full aspect-square"
            src="/img/buncha.jpg"
          />
          <p className="font-bold">Username</p>
        </div>
        <div
          className={`w-full min-h-[5rem] bg-${
            props.type === "restaurant" ? "white" : "cream"
          } rounded-2xl px-10 py-5 relative`}
        >
          <div className="mb-6">
            {ratingArray.map((e, index) => {
              if (!ratingValue) return;
              if (index < ratingValue) {
                return (
                  <svg
                    width="30"
                    height="34"
                    viewBox="0 0 60 64"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: "#FFBA00" }}
                    className="cursor-pointer inline"
                  >
                    <path
                      d="M31.3877 54.3698C30.3605 53.7883 29.1514 53.7883 28.1242 54.3698L14.9591 61.8221C12.1709 63.4004 9.03152 60.5493 9.78758 57.1254L12.8658 43.1853C13.1602 41.8524 12.8499 40.4411 12.0381 39.42L1.87657 26.6373C-0.148955 24.0893 1.28987 20.0181 4.3088 19.7551L18.4844 18.5206C19.8104 18.4051 20.9759 17.482 21.5262 16.1113L26.4342 3.88686C27.7305 0.658161 31.7813 0.658155 33.0776 3.88685L37.9856 16.1113C38.5359 17.482 39.7014 18.4051 41.0274 18.5206L55.203 19.7551C58.222 20.0181 59.6608 24.0893 57.6353 26.6373L47.4737 39.42C46.6619 40.4411 46.3517 41.8524 46.646 43.1853L49.7242 57.1254C50.4803 60.5493 47.3409 63.4004 44.5527 61.8221L31.3877 54.3698Z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                );
              } else {
                return (
                  <svg
                    width="30"
                    height="34"
                    viewBox="0 0 60 64"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: "#FFE8E0" }}
                    className="cursor-pointer inline"
                  >
                    <path
                      d="M31.3877 54.3698C30.3605 53.7883 29.1514 53.7883 28.1242 54.3698L14.9591 61.8221C12.1709 63.4004 9.03152 60.5493 9.78758 57.1254L12.8658 43.1853C13.1602 41.8524 12.8499 40.4411 12.0381 39.42L1.87657 26.6373C-0.148955 24.0893 1.28987 20.0181 4.3088 19.7551L18.4844 18.5206C19.8104 18.4051 20.9759 17.482 21.5262 16.1113L26.4342 3.88686C27.7305 0.658161 31.7813 0.658155 33.0776 3.88685L37.9856 16.1113C38.5359 17.482 39.7014 18.4051 41.0274 18.5206L55.203 19.7551C58.222 20.0181 59.6608 24.0893 57.6353 26.6373L47.4737 39.42C46.6619 40.4411 46.3517 41.8524 46.646 43.1853L49.7242 57.1254C50.4803 60.5493 47.3409 63.4004 44.5527 61.8221L31.3877 54.3698Z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                );
              }
            })}
          </div>
          {/* <div className="flex gap-5 mb-6">
            <img className="w-32 aspect-[4/3]" src="/img/buncha.jpg" />
            <img className="w-32 aspect-[4/3]" src="/img/buncha.jpg" />
          </div> */}
          <div className="mb-8">
            {props.type === "restaurant"
              ? props.review?.about_quality
              : props.foodReview?.about_decoration}
          </div>
          <FiHelpCircle className="absolute right-5 top-5 text-3xl stroke-[#f03e3e] cursor-pointer text-mainShade" />
        </div>
      </div>
      <div className="flex px-60 justify-around min-w-225 mt-5">
        {like === true ? (
          <FaHeart
            className="text-3xl fill-[#f03e3e] cursor-pointer inline"
            onClick={() => setLike(!like)}
          />
        ) : (
          <FiHeart
            className="text-3xl stroke-[#f03e3e] cursor-pointer inline"
            onClick={() => setLike(!like)}
          />
        )}
        <FaRegComment className="text-3xl stroke-[#f03e3e] cursor-pointer inline text-mainShade" />
        <p className="font-bold text-mainShade text-xl">12/08/2022</p>
      </div>
    </div>
  );
};

export default CommentCard;
