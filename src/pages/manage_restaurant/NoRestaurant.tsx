import { useEffect, useState } from "react";
import { ButtonPrimary, ButtonSecondary } from "../../components/common";
import { Backdrop } from "@mui/material";
import { BsArrowRight, BsCamera } from "react-icons/bs";
import Restaurant from "../../models/restaurants";

const initialRestaurant: Restaurant = {
  manager_id: "",
  name: "",
  description: "",
  address: "",
  website: "",
  email: "",
  phone: "",
  image: "",
  license_image: "",
  food_list: [],
  open_at: "",
  close_at: "",
  is_active: false,
  rating: 0,
};

interface RestaurantRequestFormProps {
  openForm: boolean;
  onCloseBtnClick: () => void;
}
function RestaurantRequestForm({
  openForm,
  onCloseBtnClick,
}: RestaurantRequestFormProps): JSX.Element {
  const [restaurant, setRestaurant] = useState<Restaurant>(initialRestaurant);
  const [activeHour, setActiveHour] = useState({
    openHour: "",
    openMinute: "",
    closeHour: "",
    closeMinute: "",
  });

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedImage = e.target.files[0];
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openForm}
    >
      <form className="p-4 rounded-md bg-mainTint text-black jp w-3/5 min-w-0">
        <p className="mb-8">以下の情報を入力してください。</p>
        <div className="flex gap-8 mb-8 items-stretch">
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex flex-col">
              <label htmlFor="restaurant-name" className="font-bold">
                レストラン名
              </label>
              <input
                id="restaurant-name"
                type="text"
                className="p-1 rounded"
                onChange={(e) =>
                  setRestaurant({ ...restaurant, name: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="address" className="font-bold">
                アドレス
              </label>
              <input
                id="address"
                type="text"
                className="p-1 rounded"
                onChange={(e) =>
                  setRestaurant({ ...restaurant, address: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="website" className="font-bold">
                ウェブサイト
              </label>
              <input
                id="website"
                type="text"
                className="p-1 rounded"
                onChange={(e) =>
                  setRestaurant({ ...restaurant, website: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="email" className="font-bold">
                メールアドレス
              </label>
              <input
                id="email"
                type="text"
                className="p-1 rounded"
                onChange={(e) =>
                  setRestaurant({ ...restaurant, email: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="phone" className="font-bold">
                電話番号
              </label>
              <input
                id="phone"
                type="text"
                className="p-1 rounded"
                onChange={(e) =>
                  setRestaurant({ ...restaurant, phone: e.target.value })
                }
              />
            </div>
            <div className="w-full flex gap-4 basis-0 grow shrink">
              <div>
                <label htmlFor="open" className="font-bold">
                  営業時間
                </label>
                <div className=" w-full flex gap-2 items-center">
                  <input
                    id="open"
                    type="number"
                    min={0}
                    max={24}
                    className="p-1 rounded w-10"
                    onChange={(e) =>
                      setActiveHour({ ...activeHour, openHour: e.target.value })
                    }
                  />
                  <span>:</span>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    className="p-1 rounded w-10"
                    onChange={(e) =>
                      setActiveHour({
                        ...activeHour,
                        openMinute: e.target.value,
                      })
                    }
                  />
                  <span>AM</span>
                </div>
              </div>
              <p className="text-3xl self-end">
                <BsArrowRight />
              </p>
              <div>
                <label htmlFor="open" className="font-bold">
                  閉店時間
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    id="open"
                    type="number"
                    min={0}
                    max={24}
                    className="p-1 rounded w-10"
                    onChange={(e) =>
                      setActiveHour({
                        ...activeHour,
                        closeHour: e.target.value,
                      })
                    }
                  />
                  <span>:</span>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    className="p-1 rounded w-10"
                    onChange={(e) =>
                      setActiveHour({
                        ...activeHour,
                        closeMinute: e.target.value,
                      })
                    }
                  />
                  <span>PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 items-stretch">
            <div className="w-full flex flex-col">
              <label htmlFor="restaurant-img" className="font-bold">
                レストランの写真
              </label>
              <label className="justify-center flex items-center font-semibold cursor-pointer p-1 bg-white w-1/2 rounded-lg">
                <div className="flex gap-2">
                  <div className="flex justify-center items-center">
                    <BsCamera className="text-3xl" />
                  </div>
                  <input
                    type="file"
                    name="upload-file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUploadFile}
                  />
                  <p className="flex items-center justify-center">
                    アップロード
                  </p>
                </div>
              </label>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="restaurant-img" className="font-bold">
                ライセンス写真
              </label>
              <label className="justify-center flex items-center font-semibold cursor-pointer p-1 bg-white w-1/2 rounded-lg">
                <div className="flex gap-2">
                  <div className="flex justify-center items-center">
                    <BsCamera className="text-3xl" />
                  </div>
                  <input
                    type="file"
                    name="upload-file"
                    accept="image/*"
                    style={{ display: "none" }}
                    // onChange={handleUploadFile}
                  />
                  <p className="flex items-center justify-center">
                    アップロード
                  </p>
                </div>
              </label>
            </div>
            <div className="w-full flex flex-col h-full">
              <label htmlFor="description" className="font-bold">
                説明
              </label>
              <textarea id="description" className="p-1 rounded self-stretch" />
            </div>
          </div>
        </div>
        <div className="flex justify-around w-full">
          <ButtonPrimary
            title="登録する"
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
            }}
          />
          <ButtonSecondary
            title="キャンセル"
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
              onCloseBtnClick();
            }}
          />
        </div>
      </form>
    </Backdrop>
  );
}

function NoRestaurant(): JSX.Element {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
    <>
      <RestaurantRequestForm
        openForm={openForm}
        onCloseBtnClick={handleCloseForm}
      />
      <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-yellow-100 p-4">
            <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
              <svg
                className="w-16 h-16"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
            レストランを所有していないません
          </h1>
          <p className="text-slate-600 my-5 lg:text-lg">
            ここをクリックして新しいレストランを作成してください
          </p>
          <ButtonPrimary title="レストラン登録する" onClick={handleOpenForm} />
        </div>
      </div>
    </>
  );
}

export default NoRestaurant;
