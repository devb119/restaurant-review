import { useEffect, useState } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  Loading,
} from "../../components/common";
import { Backdrop } from "@mui/material";
import { BsArrowRight, BsUpload } from "react-icons/bs";
import { AiOutlineClose, AiFillInfoCircle } from "react-icons/ai";
import Restaurant, { validateRestaurant } from "../../models/restaurants";
import { imageUploader } from "../../services/ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createRestaurant } from "../../services/RestaurantApi";
import { useNavigate } from "react-router-dom";

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
  onSuccess: () => void;
}
function RestaurantRequestForm({
  openForm,
  onCloseBtnClick,
  onSuccess,
}: RestaurantRequestFormProps): JSX.Element {
  const [restaurant, setRestaurant] = useState<Restaurant>(initialRestaurant);
  const [activeHour, setActiveHour] = useState({
    openHour: "",
    openMinute: "",
    closeHour: "",
    closeMinute: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantImg, setRestaurantImg] = useState<File | null>(null);
  const [previewRes, setPreviewRes] = useState("");
  const [licenseImg, setLicenseImg] = useState<File | null>(null);
  const [previewLicense, setPreviewLicense] = useState("");
  const [message, setMessage] = useState("");

  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const handleUploadFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "restaurant" | "license"
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (type === "restaurant") {
      setRestaurantImg(file);
      if (previewRes.length !== 0) URL.revokeObjectURL(previewRes);
      setPreviewRes(URL.createObjectURL(file));
    } else {
      setLicenseImg(file);
      if (previewLicense.length !== 0) URL.revokeObjectURL(previewLicense);
      setPreviewLicense(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const openTime = `${activeHour.openHour}:${activeHour.openMinute}`;
    const closeTime = `${activeHour.closeHour}:${activeHour.closeMinute}`;
    let restaurantWithTime: Restaurant = {
      ...restaurant,
      open_at: openTime,
      close_at: closeTime,
      manager_id: user ? user.id : "",
      created_at: new Date(Date.now()),
    };
    // Implement validation here
    if (!restaurantImg || !licenseImg) {
      setMessage("レストランの画像とライセンスの画像を提供してください");
      return;
    }
    setIsLoading(true);
    try {
      if (validateRestaurant(restaurantWithTime)) {
        const uploadResImg = imageUploader(
          user?.email + "/restaurants/",
          restaurantImg
        );
        const uploadLicenseImg = imageUploader(
          user?.email + "/restaurants/",
          licenseImg
        );
        const [imgUrl, licenseUrl] = await Promise.all([
          uploadResImg,
          uploadLicenseImg,
        ]);
        if (!user) return;
        restaurantWithTime = {
          ...restaurantWithTime,
          image: imgUrl,
          license_image: licenseUrl,
          manager_id: user.id,
          created_at: new Date(),
        };
        const res = await createRestaurant(restaurantWithTime);
        setIsLoading(false);
        onCloseBtnClick();
        onSuccess();
        setTimeout(() => navigate(0), 1500);
      }
    } catch (err) {
      if (err instanceof Error) setMessage(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewLicense);
      URL.revokeObjectURL(previewRes);
    };
  }, [previewLicense, previewRes]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openForm}
    >
      <form className="p-4 rounded-md bg-mainTint text-black jp w-3/5 min-w-0">
        <p className="mb-2">以下の情報を入力してください。</p>
        <p className="h-8 text-main">{message}</p>
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
                value={restaurant.name}
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
                value={restaurant.address}
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
                value={restaurant.website}
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
                value={restaurant.email}
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
                value={restaurant.phone}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, phone: e.target.value })
                }
              />
            </div>
            <div className="w-full flex gap-8 items-center">
              <div>
                <label htmlFor="open" className="font-bold mb-4">
                  営業時間
                </label>
                <div className=" w-full flex gap-2 items-center">
                  <input
                    id="open"
                    type="number"
                    min={0}
                    max={12}
                    className="p-1 rounded w-10"
                    value={activeHour.openHour}
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
                    value={activeHour.openMinute}
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
              <p className="text-3xl">
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
                    max={12}
                    className="p-1 rounded w-10"
                    value={activeHour.closeHour}
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
                    value={activeHour.closeMinute}
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
              {previewRes.length !== 0 ? (
                <div className="flex gap-4 items-center">
                  <img src={previewRes} className="rounded w-1/4" />
                  <span
                    className="bg-white cursor-pointer rounded-full w-10 h-10 p-2 flex items-center justify-center"
                    onClick={() => {
                      setPreviewRes("");
                      setRestaurantImg(null);
                    }}
                  >
                    <AiOutlineClose />
                  </span>
                </div>
              ) : (
                <label className="justify-center flex items-center font-semibold cursor-pointer p-1 bg-white w-1/2 rounded-lg">
                  <div className="flex gap-2">
                    <div className="flex justify-center items-center">
                      <BsUpload className="text-2xl" />
                    </div>
                    <input
                      type="file"
                      name="upload-file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleUploadFile(e, "restaurant")}
                    />
                    <p className="flex items-center justify-center">
                      アップロード
                    </p>
                  </div>
                </label>
              )}
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="restaurant-img" className="font-bold">
                ライセンス写真
              </label>
              {previewLicense.length !== 0 ? (
                <div className="flex gap-4 items-center">
                  <img src={previewLicense} className="rounded w-1/4" />
                  <span
                    className="bg-white cursor-pointer rounded-full w-10 h-10 p-2 flex items-center justify-center"
                    onClick={() => {
                      setPreviewLicense("");
                      setLicenseImg(null);
                    }}
                  >
                    <AiOutlineClose />
                  </span>
                </div>
              ) : (
                <label className="justify-center flex items-center font-semibold cursor-pointer p-1 bg-white w-1/2 rounded-lg">
                  <div className="flex gap-2">
                    <div className="flex justify-center items-center">
                      <BsUpload className="text-2xl" />
                    </div>
                    <input
                      type="file"
                      name="upload-file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleUploadFile(e, "license")}
                    />
                    <p className="flex items-center justify-center">
                      アップロード
                    </p>
                  </div>
                </label>
              )}
            </div>
            <div className="w-full flex flex-col h-full">
              <label htmlFor="description" className="font-bold">
                説明
              </label>
              <textarea
                id="description"
                className="p-1 rounded self-stretch h-full"
                value={restaurant.description}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around w-full">
          {isLoading ? (
            <Loading />
          ) : (
            <ButtonPrimary title="登録する" onClick={handleSubmit} />
          )}
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
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  return (
    <>
      <RestaurantRequestForm
        openForm={openForm}
        onCloseBtnClick={handleCloseForm}
        onSuccess={handleOpenPopup}
      />
      {openPopup ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-10 bg-white jp border border-main rounded-lg">
          <p className="text-3xl text-main flex justify-center mb-4">
            <AiFillInfoCircle />
          </p>
          <p className="mb-4 text-xl">
            あなたのリクエストは送信されました。
            <br /> 管理者が承認するまで お待ち下さい。
          </p>
          <div className="flex items-center justify-center">
            <ButtonPrimary title="OK" onClick={handleClosePopup} />
          </div>
        </div>
      ) : null}
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
