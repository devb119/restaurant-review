import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { getRestaurantById } from "../services/RestaurantApi";
import { ToolTipOnHover } from "./common";

interface favoriteProps {
  foodTitle: string;
  imageUrl: string;
  rating?: number;
  restaurant_id: string;
}

function FavoriteCard1(props: favoriteProps): JSX.Element {
  const { foodTitle, imageUrl, restaurant_id } = props;
  return (
    <div className="relative w-80 overflow-hidden rounded-sm">
      <img src={imageUrl} className="w-full rounded w-58 h-44" />
      <button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded w-4/5
               font-bold text-lg flex items-center justify-between hover:bg-mainTint transition-all"
      >
        <p>{foodTitle}</p>
        <span className="text-xl text-mainShade">
          <AiOutlineArrowRight />
        </span>
      </button>
    </div>
    // <div>
    //   <section>
    //     <h1 className="text-2xl font-semibold mb-4">日本人好み料理</h1>
    //     <div>
    //       <div className="w-3/5 flex gap-4">

    //         <div className="relative w-80 overflow-hidden">
    //           <img src="/img/buncha.jpg" className="w-full rounded" />
    //           <button
    //             className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded w-4/5
    //            font-bold text-lg flex items-center justify-between hover:bg-mainTint transition-all"
    //           >
    //             <p>Bun Cha</p>
    //             <span className="text-xl text-mainShade">
    //               <AiOutlineArrowRight />
    //             </span>
    //           </button>
    //         </div>
    //         <div className="relative w-80 overflow-hidden">
    //           <img src="/img/buncha.jpg" className="w-full rounded" />
    //           <button
    //             className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded w-4/5
    //            font-bold text-lg flex items-center justify-between hover:bg-mainTint transition-all"
    //           >
    //             <p>Bun Cha</p>
    //             <span className="text-xl text-mainShade">
    //               <AiOutlineArrowRight />
    //             </span>
    //           </button>
    //         </div>
    //       </div>
    //       <div className="w-2/5 relative"></div>
    //     </div>
    //   </section>
    // </div>
  );
}

export function FavoriteCard2(props: favoriteProps): JSX.Element {
  const { foodTitle, rating, imageUrl, restaurant_id } = props;
  const [restaurantName, setRestaurantName] = useState<any>("");
  useEffect(() => {
    getRestaurantById(restaurant_id).then((res) => {
      setRestaurantName(res.name);
    });
  }, []);
  return (
    <div className="bg-white p-4 flex flex-col w-64 rounded-sm">
      <img src={imageUrl} className="w-54 h-44 rounded" />
      <div className="flex flex-row justify-between items-center">
        <p className="py-1 font-semibold text-lg">{foodTitle} </p>
        <div className="flex items-center">
          <span className="font-extrathin text-sm text-yellow-500 px-1">
            <FaStar></FaStar>
          </span>
          <p className="font-thin text-sm">{rating}</p>
        </div>
      </div>

      <div className="text-sm font-thin">
        <ToolTipOnHover textContent={restaurantName} limit={20} />
      </div>
    </div>
  );
}

export default FavoriteCard1;
