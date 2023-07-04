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
import AddFoodForm from "./AddFoodForm";
import { AiOutlinePlusCircle } from "react-icons/ai";

function ManageMenu() {
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user?.id) {
      // console.log(user.id)
      getRestaurantByManagerId(user.id)
        .then((res) => {
          console.log(res);
          setRestaurant(res);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="">
      <div className="flex flex-wrap bg-white relative">
        <div>
          <Sidebar></Sidebar>
        </div>

        {/* <div
          className="absolute top-0 right-0 text-white w-40 bg-red-500 rounded-full px-2 py-2 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <AiOutlinePlusCircle className="text-5xl inline-block" />
          <span className="text-2xl font-bold ml-2 inline-block translate-y-1">
            作成
          </span>
        </div> */}
        {modalOpen && <AddFoodForm setOpenModal={setModalOpen} />}
        {loading ? (
          <div className="m-auto">
            {" "}
            <Loading></Loading>{" "}
          </div>
        ) : (
          <div className="-mt-20 flex-1">
            {user?.role === UserRole.RestaurantManager ? (
              restaurant && restaurant.id ? (
                <MenuTable
                  restaurantId={restaurant.id}
                  setOpenModal={setModalOpen}
                />
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
