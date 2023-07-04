import { useEffect, useState } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  Loading,
} from "../../components/common";
import { Backdrop } from "@mui/material";
import { BsArrowRight, BsUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Restaurant, { validateRestaurant } from "../../models/restaurants";
import { imageUploader } from "../../services/ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createRestaurant } from "../../services/RestaurantApi";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

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
  currentRestaurant: Restaurant;
}
function RestaurantRequestForm({
  openForm,
  onCloseBtnClick,
  currentRestaurant,
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

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewLicense);
      URL.revokeObjectURL(previewRes);
    };
  }, [previewLicense, previewRes]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openForm}
      >
        <form className=" p-4 rounded-md bg-mainTint text-black jp w-3/5 min-w-0">
          <h2 className="mb-2 text-xl font-semibold">レストラン情報</h2>
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
                  value={currentRestaurant.name}
                  disabled
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
                  disabled
                  value={currentRestaurant.address}
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
                  disabled
                  value={currentRestaurant.website}
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
                  value={currentRestaurant.email}
                  disabled
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
                  value={currentRestaurant.phone}
                  disabled
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
                      value={7}
                      disabled
                      onChange={(e) =>
                        setActiveHour({
                          ...activeHour,
                          openHour: e.target.value,
                        })
                      }
                    />
                    <span>:</span>
                    <input
                      type="number"
                      min={0}
                      max={60}
                      className="p-1 rounded w-10"
                      value={30}
                      disabled
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
                      value={21}
                      disabled
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
                      value={10}
                      disabled
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

                <div className="flex gap-4 items-center">
                  <img
                    src={currentRestaurant.image}
                    className="rounded w-[33%]"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="restaurant-img" className="font-bold">
                  ライセンス写真
                </label>

                <div className="flex gap-4 items-center">
                  <img
                    src={
                      currentRestaurant.license_image
                        ? currentRestaurant.license_image
                        : currentRestaurant.image
                    }
                    className="rounded w-[33%]"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col h-full">
                <label htmlFor="description" className="font-bold">
                  説明
                </label>
                <textarea
                  id="description"
                  className="p-1 rounded self-stretch h-full"
                  value={currentRestaurant.description}
                  disabled
                  onChange={(e) =>
                    setRestaurant({
                      ...restaurant,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <ButtonPrimary
              title="キャンセル"
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                onCloseBtnClick();
              }}
            />
          </div>
        </form>
      </Backdrop>
    </>
  );
}

function AdminViewDetail({
  onClose,
  currentRestaurant,
}: {
  onClose: any;
  currentRestaurant: Restaurant;
}): JSX.Element {
  const [openForm, setOpenForm] = useState(true);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    onClose(false);
  };

  return (
    <>
      <RestaurantRequestForm
        openForm={openForm}
        onCloseBtnClick={handleCloseForm}
        currentRestaurant={currentRestaurant}
      />
    </>
  );
}

export default AdminViewDetail;
