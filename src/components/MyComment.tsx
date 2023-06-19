import { FaHeart, FaRegComment } from "react-icons/fa";
import { useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import { BiCamera } from "react-icons/bi";
<<<<<<< HEAD
import Rate from "./Rate";
=======
>>>>>>> 7025b92 (add food review section)

interface Props {
  type: string;
}

const CommentCard = (props: Props) => {
  const [like, setLike] = useState(false);
<<<<<<< HEAD
  const [rating, setRating] = useState(0);
=======
>>>>>>> 7025b92 (add food review section)
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
<<<<<<< HEAD
              <Rate
                  rating={rating}
                  onRating={(rate : number) => setRating(rate)}
                  count={5}
              />
=======
          {props.type === "main"
            ? ratingArray.map((e, index) => {
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
              })
            : null}
>>>>>>> 7025b92 (add food review section)
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
