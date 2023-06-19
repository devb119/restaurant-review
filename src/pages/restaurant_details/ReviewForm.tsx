import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Rate from "../../components/Rate";

interface Props {
  setOpenModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  username: string;
}

const ReviewForm = ({ setOpenModal, username }: Props) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const ratingArray = Array(5).fill(0);
  const ratingValue = 3;
  const uploadPicture = () => {
    if (!inputFile.current) return;
    inputFile.current.click();
  };

  // const handleSubmit = () => {
  //     // console.log(content);
  //     if (content.length === 0 && selectedImage === null) {
  //         alert("Please fill all the required area");
  //     } else {
  //         const formData = new FormData();
  //         formData.append("content", content);
  //         formData.append("image", selectedImage);
  //         router.post("/addpost", formData);
  //         setOpenModal(false);
  //         alert("Added post");
  //     }
  // };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-10 bg-mainTint">
      <div className="bg-white flex flex-col p-6 relative items-center justify-between w-1/2 h-fit min-h-685 shadow-xl rounded-xl px-32">
        <div className="w-8 absolute top-1.5 right-1.5 text-xs">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="bg-transparent text-xl text-main font-black cursor-pointer border-none"
          >
            X
          </button>
        </div>
        <div className="w-full text-center text-3xl font-black">
          <h3>レストラン評価</h3>
        </div>
        <div className="flex justify-start w-full gap-14 text-2xl mt-28">
          <h4>評価</h4>
          <div className="mb-6">
              <Rate
                  rating={rating}
                  onRating={(rate : number) => setRating(rate)}
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
            console.log(selectedImage);
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
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <div className="h-12 m-2 text-black text-center bg-mainTint text-main pt-4 rounded-lg text-xl cursor-pointer w-150 h-60">
          <button>投稿</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
