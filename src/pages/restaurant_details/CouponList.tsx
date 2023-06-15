import React, { useState } from "react";
import Coupon from "../../models/coupons";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { current } from "@reduxjs/toolkit";

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
  return (
    <div>
      <div className="font-bold text-xl my-4">クーポンコード一覧</div>
      <div className="flex justify-around items-center">
        <span className="text-2xl text-main font-semibold cursor-pointer">
          <TbPlayerTrackPrev></TbPlayerTrackPrev>
        </span>
        <div className="bg-white rounded-md p-4 flex justify-start flex-wrap w-3/5">
          <div className="w-52 h-52 mr-6 ml-2">
            <img className="w-52 h-52 rounded-md" src={image} />
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
        <span className="text-2xl text-main font-semibold cursor-pointer">
          <TbPlayerTrackNext></TbPlayerTrackNext>
        </span>
      </div>
    </div>
  );
}

export default CouponList;
