import { useContext, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Rate from "../../components/Rate";
import Review from "../../models/reviews";
import { createNewReview } from "../../services/ReviewApi";
import { Loading } from "../../components/common";
import { reviewContext } from "./ReviewSection";
import { FiX } from "react-icons/fi";
import { imageUploader } from "../../services/ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
  setOpenModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  restaurant_id: string;
  id: string;
}

const ReviewForm = ({ setOpenModal, restaurant_id, id }: Props) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState<string>("");
  const { reviewList, setReviewList } = useContext(reviewContext);
  const user = useSelector((state: RootState) => state.user.user);
  // const ratingArray = Array(5).fill(0);
  // const ratingValue = 3;

  // const navigate = useNavigate();
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
        console.log(user?.email);
        const uploadImg = imageUploader(
          user?.email + "/reviews/",
          selectedImage
        );
        Promise.all([uploadImg]).then((result) => {
          setLoading(true);
          const review: Review = {
            restaurant_id: restaurant_id,
            user_id: id,
            about_space: content,
            about_quality: content,
            other_review: content,
            star: rating,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
            food_review_list: [],
            image_url: String(result),
          };
          createNewReview(review);
          setMessage("追加できました。");
          setTimeout(() => setLoading(false), 2000);
          setTimeout(() => setOpenModal(false), 2000);
          setReviewList([...reviewList, review]);
        });
      } else {
        setLoading(true);
        const review: Review = {
          restaurant_id: restaurant_id,
          user_id: id,
          about_space: content,
          about_quality: content,
          other_review: content,
          star: rating,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
          food_review_list: [],
          image_url: "",
        };
        createNewReview(review);
        setMessage("追加できました。");
        setTimeout(() => setLoading(false), 2000);
        setTimeout(() => setOpenModal(false), 2000);
        setReviewList([...reviewList, review]);
      }
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-slate-800 bg-opacity-50 overflow-y-scroll">
      <div className="bg-white flex flex-col p-6 relative items-center justify-between w-1/2 h-2/3 min-h-685 mx-auto my-32 shadow-xl rounded-xl px-32">
        <div className="flex flex-col items-center justify-between w-full gap-4">
          <div className="w-8 absolute top-6 right-6 text-xs">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="text-3xl bg-transparent text-main font-black cursor-pointer border-none"
            >
              <FiX />
            </button>
          </div>
          <div className="w-full text-center text-3xl font-black">
            <h3>レストラン評価</h3>
          </div>
          <div className="flex justify-start w-full gap-14 text-2xl mt-20">
            <h4>評価</h4>
            <div className="mb-6">
              <Rate
                rating={rating}
                onRating={(rate: number) => setRating(rate)}
                count={5}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-5">
            <h4 className="text-2xl">コメント</h4>
            <textarea
              rows={5}
              placeholder="感情を入力"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              className="pl-5 pt-5 border-2 border-slate-300 h-150 rounded-lg"
            ></textarea>
          </div>
          <button
            className="text-center w-full h-60 border-2 border-slate-300 rounded-lg text-green-400 font-black"
            onClick={uploadPicture}
          >
            <FaCamera className="inline w-60 text-4xl" />
            レストランの写真を追加
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
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>削除</button>
            </div>
          )}
        </div>
        <div className="text-main">{message}</div>
        <button
          className="h-12 m-2 text-center bg-mainTint text-main rounded-lg text-xl cursor-pointer w-150 min-h-60 hover:bg-[#ffc6b3]"
          onClick={handleSubmit}
        >
          {loading ? <Loading /> : "投稿"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
