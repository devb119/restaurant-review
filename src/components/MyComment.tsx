import { useContext, useRef, useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import { BiCamera } from "react-icons/bi";
import Rate from "./Rate";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FoodReview from "../models/food_reviews";
import { createNewFoodReview } from "../services/FoodReviewApi";
import { FoodReviewContext } from "../pages/food_details/FoodReviewSection";
import { Link } from "react-router-dom";
import { imageUploader } from "../services/ImageUploader";

interface Props {
  type: string;
  id: string;
}
const MyComment = (props: Props) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { reviewList, setReviewList } = useContext(FoodReviewContext);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const user = useSelector((state: RootState) => state.user.user);

  const uploadPicture = () => {
    if (!inputFile.current) return;
    inputFile.current.click();
  };

  const handleSubmit = () => {
    if (content.length === 0 || rating === 0) {
      setMessage("項目をすべて入力してください");
      return;
    } else {
      if (selectedImage) {
        const uploadImg = imageUploader(
          user?.email + "/reviews/",
          selectedImage
        );
        Promise.all([uploadImg]).then((result) => {
          // console.log(result);
          const review: FoodReview = {
            food_id: props.id,
            user_id: user?.id || "",
            star: rating,
            about_price: content,
            about_decoration: content,
            other: content,
            image_url: String(result),
          };
          createNewFoodReview(review);
          setMessage("追加できました。");
          setReviewList([...reviewList, review]);
          setContent("");
          setSelectedImage(null);
          setRating(0);
        });
      } else {
        const review: FoodReview = {
          food_id: props.id,
          user_id: user?.id || "",
          star: rating,
          about_price: content,
          about_decoration: content,
          other: content,
          image_url: "",
        };
        createNewFoodReview(review);
        setMessage("追加できました。");
        setReviewList([...reviewList, review]);
        setContent("");
        setSelectedImage(null);
        setRating(0);
      }
    }
  };

  return (
    <>
      {user ? (
        <div className="flex gap-8 h-100 relative">
          <div className="flex flex-col gap-2 mt-8 items-center">
            <img
              className="w-24 rounded-full aspect-square"
              src={user?.image}
            />
            <p className="font-bold text-center">{user?.username}</p>
          </div>
          <div
            className={`w-full min-h-[8rem] bg-${
              props.type === "restaurant" ? "white" : "slate-200"
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
              className="pl-3 pt-3 border border-slate-300 rounded-lg bg-transparent w-full pr-16 h-1/2"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            {props.type === "main" ? (
              // <BiCamera className="text-5xl mb-10" />
              <div className="flex items-center mb-5">
                <button
                  className="text-center border-slate-300 rounded-lg text-green-400 font-black"
                  onClick={uploadPicture}
                >
                  <BiCamera className="text-5xl" />
                </button>
                <input
                  type={"file"}
                  style={{ display: "none" }}
                  ref={inputFile}
                  onChange={(event) => {
                    if (!event.target.files) return;
                    setSelectedImage(event.target.files[0]);
                  }}
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  name="image"
                />
                {selectedImage && (
                  <div>
                    {selectedImage.name}
                    {"  "}
                    <button onClick={() => setSelectedImage(null)}>削除</button>
                  </div>
                )}
              </div>
            ) : null}
            <div className="text-main">{message}</div>
          </div>
          <SlPaperPlane
            onClick={handleSubmit}
            className="absolute right-8 top-8 text-3xl stroke-[#f03e3e] cursor-pointer text-mainShade hover:fill-[#b32e01]"
          />
        </div>
      ) : (
        <div className="w-full text-center border-t-2 border-slate-300 pt-4">
          <Link to="/auth/login">
            レビューを追加するためにログインしてください
          </Link>
        </div>
      )}
    </>
  );
};

export default MyComment;
