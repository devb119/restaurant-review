import {
  HiCheckCircle,
  HiOutlineCheckCircle,
  HiOutlineEye,
} from "react-icons/hi";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { updateRestaurantInfo } from "../../services/RestaurantApi";
import Restaurant from "../../models/restaurants";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const StatusUpdate = ({
  restaurant,
  openDetail,
}: {
  restaurant: Restaurant;
  openDetail: any;
}) => {
  const [isActive, setIsActive] = useState<boolean>(restaurant.is_active);
  const [popUpNoti, setPopUpNoti] = useState<boolean>(false);
  const [popUpAlert, setPopUpAlert] = useState<boolean>(false);
  const user = useAuth();
  const statusUpdateHandler = () => {
    if ( restaurant.id) {
      restaurant.is_active = !restaurant.is_active;
      const update = updateRestaurantInfo(
        restaurant.id,
        restaurant,
        user?.role ? user?.role : 0
      ).then((res) => {
        if (res) {
          setPopUpAlert(true);
        } else {
          setIsActive(!isActive);
          setPopUpNoti(true);
        }
      });
      Promise.all([update]).then(() => {
        setTimeout(() => setPopUpNoti(false), 1500);
        setTimeout(() => setPopUpAlert(false), 1500);
      });
    }
  };

  const viewDetailHander = () => {
    openDetail(true);
  };

  return (
    <>
      {popUpNoti && (
        <Snackbar open={true} autoHideDuration={5000}>
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            リクエストが更新しますた。
          </Alert>
        </Snackbar>
      )}
      {popUpAlert && (
        <Snackbar open={true} autoHideDuration={5000}>
          <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
            あなたは管理者ではないため、このフィールドは変更できません
          </Alert>
        </Snackbar>
      )}
      <div className="flex gap-2 text-2xl">
        <span className="cursor-pointer" onClick={statusUpdateHandler}>
          {isActive ? <MdOutlineCancel /> : <MdCancel fill="#f03e3e" />}
        </span>
        <span className="cursor-pointer" onClick={statusUpdateHandler}>
          {isActive ? (
            <HiCheckCircle fill="#51cf66" />
          ) : (
            <HiOutlineCheckCircle />
          )}
        </span>
        <span className="cursor-pointer" onClick={viewDetailHander}>
          <HiOutlineEye />
        </span>
      </div>
    </>
  );
};

export default StatusUpdate;
