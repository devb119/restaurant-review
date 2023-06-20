import { FaHeart, FaRegComment } from "react-icons/fa";
import { useContext, useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import { BiCamera } from "react-icons/bi";
import Rate from "./Rate";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FoodReview from "../models/food_reviews";
import { createNewFoodReview } from "../services/FoodReviewApi";
import { FoodReviewContext } from "../pages/food_details/FoodReviewSection";

interface Props {
  type: string;
  id: string;
}
const MyComment = (props: Props) => {
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { reviewList, setReviewList } = useContext(FoodReviewContext);

  const user = useSelector((state: RootState) => state.user.user);

  const [userName, setUserName] = useState<string | undefined>(user?.username);

  const ratingArray = Array(5).fill(0);
  const ratingValue = 3;

  const handleSubmit = () => {
    console.log(content);
    console.log(rating);
    if (content.length === 0 || rating === 0) {
      setMessage("項目をすべて入力してください");
      return;
    } else {
      let review: FoodReview = {
        food_id: props.id,
        star: rating,
        about_price: content,
        about_decoration: content,
        other: content,
      };
      createNewFoodReview(review);
      setMessage("追加できました。");
      setReviewList([...reviewList, review]);
    }
  };

  return (
    <>
      {user ? (
        <div className="flex gap-8 h-100 relative">
          <div className="flex flex-col gap-2 mt-8">
            <img
              className="w-24 rounded-full aspect-square"
              src={user?.image}
            />
            <p className="font-bold">{user?.username}</p>
          </div>
          <div
            className={`w-full min-h-[8rem] bg-${
              props.type === "restaurant" ? "white" : "cream"
            } rounded-2xl px-10 py-5 relative`}
          >
            <div className="mb-6">
              <Rate
                rating={rating}
                onRating={(rate: number) => setRating(rate)}
                count={5}
              />
            </div>
            <textarea
              rows={2}
              placeholder="感情を入力"
              name="content"
              className="pl-5 pt-5 border-2 border-slate-300 rounded-lg bg-transparent border-none w-full pr-16"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="text-main">{message}</div>
            {props.type === "main" ? <BiCamera className="text-5xl" /> : null}
          </div>
          <SlPaperPlane
            onClick={handleSubmit}
            className="absolute right-8 top-8 text-3xl stroke-[#f03e3e] cursor-pointer text-mainShade hover:fill-white"
          />
        </div>
      ) : (
        <div className="w-full text-center border-t-2 border-slate-300 pt-4">
          レビューを追加するためにログインしてください
        </div>
      )}
    </>
  );
};

export default MyComment;
