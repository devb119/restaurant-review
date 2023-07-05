import { FaHeart, FaRegComment } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import FoodReview from "../models/food_reviews";
import Review from "../models/reviews";
import { getUserByDocId } from "../services/auth/Auth";
import { IUserModel } from "../models";

interface Props {
  type: string;
  foodReview: FoodReview | null;
  review: Review | null;
}

const CommentCard = (props: Props) => {
  const [like, setLike] = useState(false);
  const [commentUser, setCommentUser] = useState<IUserModel | null>(null);
  const ratingArray = Array(5).fill(0);
  const isRestaurant = props.type === "restaurant";
  const ratingValue = isRestaurant
    ? props.review?.star
    : props.foodReview?.star;

  useEffect(() => {
    if (props.review) {
      getUserByDocId(props.review.user_id).then((user) => setCommentUser(user));
    } else if (props.foodReview) {
      getUserByDocId(props.foodReview.user_id).then((user) =>
        setCommentUser(user)
      );
    }
  }, []);
  return (
    <div className="flex flex-col justify-center mb-10 ">
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 mt-8 items-center">
          <img
            className="w-20 h-20 rounded-full aspect-square"
            src={commentUser?.image}
          />
          <p className=" font-bold text-md text-center w-32">
            {commentUser
              ? commentUser.username.length > 15
                ? `${commentUser.username.slice(0, 13)}...`
                : commentUser.username
              : "Anonymous user"}
          </p>
        </div>
        <div
          className={`w-full min-h-[5rem] bg-${
            props.type === "restaurant" ? "white" : "slate-200"
          } rounded-2xl px-10 py-5 relative`}
        >
          <div className="mb-6">
            {ratingArray.map((_, index) => {
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
                    key={index}
                  >
                    <path
                      d="M31.3877 54.3698C30.3605 53.7883 29.1514 53.7883 28.1242 54.3698L14.9591 61.8221C12.1709 63.4004 9.03152 60.5493 9.78758 57.1254L12.8658 43.1853C13.1602 41.8524 12.8499 40.4411 12.0381 39.42L1.87657 26.6373C-0.148955 24.0893 1.28987 20.0181 4.3088 19.7551L18.4844 18.5206C19.8104 18.4051 20.9759 17.482 21.5262 16.1113L26.4342 3.88686C27.7305 0.658161 31.7813 0.658155 33.0776 3.88685L37.9856 16.1113C38.5359 17.482 39.7014 18.4051 41.0274 18.5206L55.203 19.7551C58.222 20.0181 59.6608 24.0893 57.6353 26.6373L47.4737 39.42C46.6619 40.4411 46.3517 41.8524 46.646 43.1853L49.7242 57.1254C50.4803 60.5493 47.3409 63.4004 44.5527 61.8221L31.3877 54.3698Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    stroke="#FFBA00"
                    strokeWidth={"1px"}
                    key={index}
                  >
                    <path
                      d="M31.3877 54.3698C30.3605 53.7883 29.1514 53.7883 28.1242 54.3698L14.9591 61.8221C12.1709 63.4004 9.03152 60.5493 9.78758 57.1254L12.8658 43.1853C13.1602 41.8524 12.8499 40.4411 12.0381 39.42L1.87657 26.6373C-0.148955 24.0893 1.28987 20.0181 4.3088 19.7551L18.4844 18.5206C19.8104 18.4051 20.9759 17.482 21.5262 16.1113L26.4342 3.88686C27.7305 0.658161 31.7813 0.658155 33.0776 3.88685L37.9856 16.1113C38.5359 17.482 39.7014 18.4051 41.0274 18.5206L55.203 19.7551C58.222 20.0181 59.6608 24.0893 57.6353 26.6373L47.4737 39.42C46.6619 40.4411 46.3517 41.8524 46.646 43.1853L49.7242 57.1254C50.4803 60.5493 47.3409 63.4004 44.5527 61.8221L31.3877 54.3698Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                );
              }
            })}
          </div>
          {props.review?.image_url || props.foodReview?.image_url ? (
            <div className="flex gap-5 mb-6">
              <img
                className="w-32 aspect-[4/3]"
                src={
                  isRestaurant
                    ? props.review?.image_url
                    : props.foodReview?.image_url
                }
              />
            </div>
          ) : null}
          <div className="mb-8">
            {isRestaurant
              ? props.review?.about_quality
              : props.foodReview?.about_decoration}
          </div>
          <div className="w-full">
            <div className="flex justify-end min-w-225 text-md items-center m-0 mt-5">
              <span className="text-md font-thin">
                {like === true ? (
                  <FaHeart
                    className="text-xl fill-[#f03e3e] ml-8 cursor-pointer inline"
                    onClick={() => setLike(!like)}
                  />
                ) : (
                  <FiHeart
                    className="text-xl stroke-[#f03e3e] ml-8 cursor-pointer inline"
                    onClick={() => setLike(!like)}
                  />
                )}
              </span>
              <FaRegComment className="text-xl ml-16 cursor-pointer inline fill-[#f03e3e]" />
              <p className="stroke-[#898989] ml-16 text-md font-thin text-main">
                {isRestaurant ? props.review?.created_at?.toLocaleString() : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
