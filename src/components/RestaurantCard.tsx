import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { ToolTipOnHover } from "./common";
import { useNavigate } from "react-router";
import Restaurant from "../models/restaurants";

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const navigate = useNavigate();
  const { id, name, address, rating, image } = restaurant;
  return (
    <div
      className="bg-white p-8 flex flex-col w-64 cursor-pointer"
      onClick={() => {
        navigate(`/restaurants/${id}`);
      }}
    >
      <img src={image} className="rounded w-full aspect-[1.5/1]" />
      <div className="flex flex-row justify-between items-center">
        <div className="py-1 font-semibold text-lg">
          <ToolTipOnHover textContent={name || ""} limit={11} />
        </div>
        <div className="flex items-center">
          <span className="font-extrathin text-sm text-yellow-500 px-1">
            <FaStar></FaStar>
          </span>
          <p className="font-thin text-sm">{rating}</p>
        </div>
      </div>

      <div className="flex">
        <span className="text-xl font-thin text-mainShade">
          <HiOutlineLocationMarker className="yellow" />
        </span>
        <p className="pl-1 font-thin text-sm">{address}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;
