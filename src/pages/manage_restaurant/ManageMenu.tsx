import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MenuTable from "./MenuTable";
import { getRestaurantByManagerId } from "../../services/RestaurantApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Restaurant from "../../models/restaurants";
import { UserRole } from "../../models/enum";
import { NoRestaurant, Unauthorized } from "..";

function ManageMenu() {
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>();

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user)
      getRestaurantByManagerId(user.id).then((res) => setRestaurant(res));
  }, []);

  return (
    <div className="flex flex-wrap">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="-mt-20 flex-1">
        {user?.role === UserRole.RestaurantManager ? (
          restaurant ? (
            <MenuTable />
          ) : (
            <NoRestaurant />
          )
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
}

export default ManageMenu;
