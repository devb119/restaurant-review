import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MenuTable from "./MenuTable";
import { getRestaurantByManagerId } from "../../services/RestaurantApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Restaurant from "../../models/restaurants";
import { UserRole } from "../../models/enum";
import { NoRestaurant, Unauthorized } from "..";
import { Loading } from "../../components/common";

function ManageMenu() {
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>();
  const [loading, setLoading] = useState<boolean>(true)
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user?.id) {
      // console.log(user.id)
      getRestaurantByManagerId(user.id).then((res) => {
        console.log(res)
        setRestaurant(res)
      }).catch((err) => console.log(err)).finally(() => { setLoading(false) });
    }
  }, [user]);

  return (
    <div className="">
      <div className="flex flex-wrap">
        <div>
          <Sidebar></Sidebar>
        </div>
        {loading ? (
         <div className="m-auto"> <Loading></Loading> </div>
        ) : (
          <div className="-mt-20 flex-1">
            {user?.role === UserRole.RestaurantManager ? (
              restaurant && restaurant.id ? (
                <MenuTable restaurantId={restaurant.id} />
              ) : (
                <NoRestaurant />
              )
            ) : (
              <Unauthorized />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMenu;
