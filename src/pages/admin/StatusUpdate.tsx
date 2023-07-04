import { HiCheckCircle, HiOutlineCheckCircle, HiOutlineEye } from "react-icons/hi"
import { MdCancel, MdOutlineCancel } from "react-icons/md"
import { Link } from "react-router-dom"
import { updateRestaurant } from "../../services/RestaurantApi"
import Restaurant from "../../models/restaurants"
import { useState } from "react"
import { Alert, Snackbar } from "@mui/material";

const StatusUpdate = ({restaurant, openDetail} : {restaurant : Restaurant, openDetail : any}) => {
    const [isActive, setIsActive] = useState<boolean>(restaurant.is_active);
    const [popUpNoti, setPopUpNoti] = useState<boolean>(false);
    const statusUpdateHandler = () => {
        restaurant.is_active = !restaurant.is_active;
        setIsActive(!isActive);
        setPopUpNoti(true);
        updateRestaurant(restaurant);
        setTimeout(() => setPopUpNoti(false), 1500);
    }

    const viewDetailHander = () => {
        openDetail(true);
    }


    return (
        <>
            {popUpNoti &&  
                <Snackbar open={true} autoHideDuration={6000} >
                    <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                        リクエストが更新しますた。
                    </Alert>
                </Snackbar>
            }
            <div className="flex gap-2 text-2xl">
                <span className="cursor-pointer" onClick={statusUpdateHandler}>{isActive ? <MdOutlineCancel /> : <MdCancel fill="#f03e3e"/>}</span>
                <span className="cursor-pointer" onClick={statusUpdateHandler}>{isActive ? <HiCheckCircle fill="#51cf66"/> : <HiOutlineCheckCircle/>}</span>
                <span className="cursor-pointer" onClick={viewDetailHander}><HiOutlineEye /></span>
            </div>
        </>
    )
}

export default StatusUpdate;