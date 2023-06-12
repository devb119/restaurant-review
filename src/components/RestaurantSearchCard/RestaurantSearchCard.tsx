import React from "react";
import "./RestaurantSearchCard.css";
import Restaurant from "../../models/restaurants";
import { FaStar } from "react-icons/fa";
import { Loading } from "../common";
import { getFoodsByRestaurant } from "../../services/RestaurantApi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
const RestaurantSearch = ({ restaurant }: { restaurant: Restaurant }) => {
  const { id, name, address, image, rating } = restaurant;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [top2, setTop2] = React.useState<any>([]);

  React.useEffect(() => {
    setLoading(true);
    getFoodsByRestaurant(restaurant.food_list)
      .then((res) => {
        // console.log(res);
        setTop2(res.sort((r1, r2) => r2.rating - r1.rating).slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [restaurant]);

  if (!id) return <></>;
  return (
    <React.Fragment>
      {loading ? (
        <div className="flex justify-center h-screen items-center">
          <Loading />
        </div>
      ) : (
        <div className="mb-8">
          <div className="bg-white rounded-md p-8 flex flex-row">
            <div className="flex flex-row w-full">
              <div className="w-2/5">
                <img
                  className="rounded w-full aspect-[4/3.14]"
                  src={image}
                ></img>
              </div>
              <div className="ml-8 w-3/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold flex">{name}</p>
                    <div className="flex items-center gap-2 ml-2">
                      <p className="text-xl">{rating}</p>
                      <svg
                        width="20"
                        height="24"
                        viewBox="0 0 60 64"
                        fill="#FFBA00"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer inline"
                      >
                        <path
                          d="M31.3877 54.3698C30.3605 53.7883 29.1514 53.7883 28.1242 54.3698L14.9591 61.8221C12.1709 63.4004 9.03152 60.5493 9.78758 57.1254L12.8658 43.1853C13.1602 41.8524 12.8499 40.4411 12.0381 39.42L1.87657 26.6373C-0.148955 24.0893 1.28987 20.0181 4.3088 19.7551L18.4844 18.5206C19.8104 18.4051 20.9759 17.482 21.5262 16.1113L26.4342 3.88686C27.7305 0.658161 31.7813 0.658155 33.0776 3.88685L37.9856 16.1113C38.5359 17.482 39.7014 18.4051 41.0274 18.5206L55.203 19.7551C58.222 20.0181 59.6608 24.0893 57.6353 26.6373L47.4737 39.42C46.6619 40.4411 46.3517 41.8524 46.646 43.1853L49.7242 57.1254C50.4803 60.5493 47.3409 63.4004 44.5527 61.8221L31.3877 54.3698Z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <ReviewButton></ReviewButton>
                  </div>
                </div>

                <div className="">
                  <div className="flex my-2">
                    <span className="text-xl font-thin text-mainShade">
                      <HiOutlineLocationMarker className="yellow" />
                    </span>
                    <p className="pl-1 font-thin text-md">{address}</p>
                  </div>
                  <div className="flex font-semibold text-red-700 text-2xl my-2">
                    おすすめ:
                  </div>
                  <div className="flex gap-8 items-end">
                    {top2.map((e: any) => (
                      <div className="">
                        <div className="flex flex-row items-center">
                          <p className="py-1 font-semibold text-md">{e.name}</p>
                          <div className="flex items-center ml-4">
                            <p className="font-thin text-sm">( {e.rating}</p>
                            <span className="font-extrathin text-sm text-yellow-500 px-1">
                              <FaStar></FaStar>
                            </span>
                            )
                          </div>
                        </div>
                        <div className="h-1/2 rounded-md">
                          <div className="w-80 h-52 overflow-hidden">
                            <img src={e.image} className="w-80 h-52"></img>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

function ReviewButton() {
  return (
    <div className="flex justify-end bg-main cursor-pointer rounded-full text-white">
      <div className=" flex p-4 py-2 rounded-sm">
        <div className="flex items-center text-white gap-2">
          <TbPlayerTrackNextFilled></TbPlayerTrackNextFilled>
          <p className="text-white">レビュー</p>
        </div>
      </div>
    </div>
  );
}
export default RestaurantSearch;
