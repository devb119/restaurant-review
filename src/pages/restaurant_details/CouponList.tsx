import React, { useState } from "react";
import Coupon from "../../models/coupons";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import Zoom from "@mui/material/Zoom";
import { Grow, Slide } from "@mui/material";
function CouponList({ couponLists }: { couponLists: Coupon[] }) {
  const [currentCoupon, setCurrentCoupon] = useState<Coupon>(couponLists[0]);
  const {
    id,
    restaurant_id,
    name,
    description,
    sale,
    point,
    quantity,
    expired_at,
    status,
    image,
  } = currentCoupon;
  const last = couponLists.length;
  console.log(last);
  const [current, setCurrent] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(current != last);
  const [hasPrev, setHasPrev] = useState<boolean>(false);

  const handlePrevClick = () => {
    if (hasPrev) {
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
      }, 200);
      setCurrentCoupon(couponLists[current - 2]);
      if (current > 2) setHasPrev(true);
      else setHasPrev(false);
      setCurrent(current - 1);
      setHasNext(true);
    }
  };

  const handleNextClick = () => {
    if (hasNext) {
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
      }, 200);

      setCurrentCoupon(couponLists[current]);
      if (current + 1 == last) setHasNext(false);
      else setHasNext(true);
      setCurrent(current + 1);
      setHasPrev(true);
    }
  };
  const containerRef = React.useRef(null);
  console.log(current);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div>
      <div className="font-bold text-xl my-4">クーポンコード一覧</div>
      <div className="flex justify-around items-center" ref={containerRef}>
        <span
          className={
            hasPrev
              ? "text-2xl text-main font-semibold cursor-pointer"
              : "text-2xl text-red-300 font-semibold"
          }
          onClick={handlePrevClick}
        >
          <TbPlayerTrackPrev></TbPlayerTrackPrev>
        </span>
        <Grow
          // direction="up"
          in={loading}
          // container={ containerRef.current }
          // timeout={700}
        >
          <div className="bg-white rounded-md p-4 flex justify-start flex-wrap w-3/5 transition ease-linear">
            <div className="w-52 h-52 mr-6 ml-2">
              <img
                className="w-52 h-52 rounded-md"
                src={image || "/img/voucher.webp"}
              />
            </div>
            <div className="font-semibold text-lg flex flex-1 flex-col justify-center gap-8">
              <div className="">割合: {sale}%</div>
              <div>引き換えポイント: {point}</div>
            </div>
            <div className="text-base text-mainShade flex-1 cursor-pointer w-3/5 flex justify-end items-end">
              <div className="">交換ポイント</div>
              <span className="p-1">
                <TbPlayerTrackNext></TbPlayerTrackNext>
              </span>
            </div>
          </div>
        </Grow>
        <span
          className={
            hasNext
              ? "text-2xl text-main font-semibold cursor-pointer"
              : "text-2xl text-red-300 font-semibold"
          }
          onClick={handleNextClick}
        >
          <TbPlayerTrackNext></TbPlayerTrackNext>
        </span>
      </div>
    </div>
  );
}

export default CouponList;
