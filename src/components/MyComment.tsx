import { FaHeart, FaRegComment } from "react-icons/fa";
import { useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import { BiCamera } from "react-icons/bi";
import Rate from "./Rate";

interface Props {
  type: string;
}

const CommentCard = (props: Props) => {
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);
  const ratingArray = Array(5).fill(0);
  const ratingValue = 3;
  return (
    <div className="flex gap-8 h-100 relative">
      <div className="flex flex-col gap-2 mt-8">
        <img
          className="w-24 rounded-full aspect-square"
          src="/img/buncha.jpg"
        />
        <p className="font-bold">Username</p>
      </div>
      <div
        className={`w-full min-h-[8rem] bg-${
          props.type === "restaurant" ? "white" : "cream"
        } rounded-2xl px-10 py-5 relative`}
      >
        <div className="mb-6">
              <Rate
                  rating={rating}
                  onRating={(rate : number) => setRating(rate)}
                  count={5}
              />
        </div>
        <textarea
          rows={2}
          placeholder="感情を入力"
          name="content"
          className="pl-5 pt-5 border-2 border-slate-300 rounded-lg bg-transparent border-none w-full pr-16"
        ></textarea>
        {props.type === "main" ? <BiCamera className="text-5xl" /> : null}
      </div>
      <SlPaperPlane className="absolute right-16 top-1/2 text-3xl stroke-[#f03e3e] cursor-pointer text-mainShade" />
    </div>
  );
};

export default CommentCard;
