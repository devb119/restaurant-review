import React, { memo, useState } from "react";
import Coupon from "../../models/coupons";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { Grow } from "@mui/material";
const CouponList = memo (({ couponLists }: { couponLists: Coupon[] }) => {
  const [currentCoupon, setCurrentCoupon] = useState<Coupon>(couponLists[0]);
  const {
    sale,
    point,
    name,
  } = currentCoupon;
  const last = couponLists.length;
 
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
  
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div>
      <div className="font-bold text-xl my-4">クーポンコード一覧</div>
      <div className="flex justify-between items-center" ref={containerRef}>
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
          in={loading}
        >
          <div className="bg-white rounded-md p-4 flex justify-start flex-wrap w-4/5 transition ease-linear">
            <div className="w-52 h-52 mr-6 ml-2">
              <div className="bg-orange-400 w-48 h-48 mt-2 rounded-md justify-center items-center text-xl text-white flex"><p className="text-center font-bold">{ name }</p></div>
            </div>
            <div className="font-semibold text-lg flex flex-1 flex-col justify-center gap-8">
              <div className="text-xl">割合: {sale}%</div>
              <div className="text-xl">引き換えポイント: {point}</div>
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
)

export default CouponList;
