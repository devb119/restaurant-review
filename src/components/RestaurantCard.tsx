import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import ToolTipOnHover from "./common/ToolTipOnHover";
interface restaurantCardProps {
  title: string;
  address: string;
  rating: number;
  imageUrl: string;
}

function RestaurantCard(props: restaurantCardProps) {
  const { title, address, rating, imageUrl } = props;
  return (
    <div className="bg-white p-8 flex flex-col w-64">
      <img src={imageUrl} className="rounded" />
      <div className="flex flex-row justify-between items-center">
        <div className="py-1">
          <ToolTipOnHover textContent={title} limit={12}></ToolTipOnHover>
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
