import { useContext, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Rate from "../../components/Rate";
import Review from "../../models/reviews";
import { createNewReview } from "../../services/ReviewApi";
import { Loading } from "../../components/common";
import { FiX } from "react-icons/fi";
import { imageUploader } from "../../services/ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Food from "../../models/foods";
import { getRestaurantByManagerId } from "../../services/RestaurantApi";
import Restaurant from "../../models/restaurants";
import { createFood } from "../../services/FoodApi";

interface Props {
  setOpenModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  foods: Food[];
  setFoods: (value: Food[] | ((prevVar: Food[]) => Food[])) => void;
}

const AddFoodForm = ({ setOpenModal, foods, setFoods }: Props) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [foodName, setFoodName] = useState<string>("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  // const ratingArray = Array(5).fill(0);
  // const ratingValue = 3;

  // const navigate = useNavigate();
  const uploadPicture = () => {
    if (!inputFile.current) return;
    inputFile.current.click();
  };

  const handleSubmit = () => {
    if (!price || !foodName || !description || !selectedImage) {
      setMessage("項目をすべて入力してください");
      return;
    } else {
      const restaurant = getRestaurantByManagerId(user?.id || "");
      if (user) {
        const uploadImg = imageUploader(
          user?.email + "/reviews/",
          selectedImage
        );

        Promise.all([uploadImg, restaurant]).then((result) => {
          setLoading(true);
          const food: Food = {
            restaurant_id: result[1].id || "",
            name: foodName,
            rating: 0,
            description: description,
            price: price,
            created_at: new Date(),
            updated_at: new Date(),
            image: String(result[0]),
          };
          createFood(food);
          setMessage("追加できました。");
          setTimeout(() => setLoading(false), 2000);
          setTimeout(() => setOpenModal(false), 2000);
          setFoods([...foods, food]);
        });
      }
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-opacity-40 bg-neutral-600 z-[1300] overflow-scroll">
      <div className="mx-auto my-12 w-1/2 min-h-[685px] bg-cream relative rounded-xl p-12">
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
        <h1 className="w-full text-center text-3xl font-black mb-28">
          料理を追加
        </h1>
        <div className="flex gap-12">
          <div className="flex flex-col gap-4 w-1/2">
            <div>
              <h3 className="text-xl font-bold mb-2">料理名</h3>
              <input
                className="pl-5 border-2 border-slate-300 rounded-lg w-full shadow-lg py-2"
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="感情を入力"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">説明</h3>
              <textarea
                rows={3}
                placeholder="感情を入力"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                className="pl-5 pt-5 border-2 border-slate-300 h-100 rounded-lg w-full shadow-lg"
              ></textarea>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">値段</h3>
              <input
                className="pl-5 border-2 border-slate-300 rounded-lg w-full shadow-lg py-2"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="感情を入力"
              />
            </div>
          </div>
          <div>
            <h3 className="mb-8 text-xl font-bold">料理の写真</h3>
            {!selectedImage && (
              <button
                className="w-full h-60 border-2 border-slate-300 rounded-lg text-green-400 font-black"
                onClick={uploadPicture}
              >
                <FaCamera className="inline w-60 text-4xl" />
                <span className="mr-4">写真を追加</span>
              </button>
            )}
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
                  className="w-[350px]"
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="font-bold"
                >
                  削除
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2>{message}</h2>
        </div>
        <div className="w-full text-center mt-20">
          <button
            onClick={handleSubmit}
            className="bg-red-500 px-12 py-3 w-40 text-white text-2xl font-black rounded-xl"
          >
            {loading ? <Loading /> : "保存"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodForm;
