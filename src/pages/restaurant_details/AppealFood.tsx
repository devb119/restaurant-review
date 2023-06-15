import React, { useState } from "react";
import { Loading } from "../../components/common";
import Food from "../../models/foods";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function AppealFood({ foodLists }: { foodLists: Food[] }) {
  const [currentDisplay, setCurrentDisplay] = useState<Food[]>(
    foodLists.slice(0, 2)
  );
  console.log(foodLists);
  const lastPage =
    foodLists.length % 2 === 0
      ? foodLists.length / 2
      : Math.floor(foodLists.length / 2) + 1;
  console.log(lastPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(currentPage != lastPage);
  console.log(currentPage);
  console.log(hasNext);
  const handlePrevClick = () => {
    if (hasPrev) {
      setCurrentDisplay(
        foodLists.slice(currentPage * 2 - 4, (currentPage - 1) * 2)
      );
      if (currentPage > 2) setHasPrev(true);
      else setHasPrev(false);
      setCurrentPage(currentPage - 1);
      setHasNext(true);
    }
  };
  const handleNextClick = () => {
    if (hasNext) {
      setCurrentDisplay(foodLists.slice(currentPage * 2, currentPage * 2 + 2));
      setHasPrev(true);
      if (currentPage + 1 === lastPage) setHasNext(false);
      else setHasNext(true);
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <div>
        <div className="font-bold text-xl my-4">クーポンコード一覧</div>
        <div className="flex justify-around items-center">
          <span
            className={
              hasPrev
                ? "text-2xl text-main font-semibold cursor-pointer"
                : "text-2xl text-red-300 font-semibold cursor-pointer"
            }
            onClick={handlePrevClick}
          >
            <TbPlayerTrackPrev></TbPlayerTrackPrev>
          </span>
          <div className="flex flex-1 gap-8 justify-center items-center overflow-hidden relative">
            {currentDisplay.map((e, index) => (
                <div
                className="bg-white rounded-md p-4 flex justify-start  hover:duration-150 flex-grow-0 transition flex-wrap w-2/5 duration-1000 ease-in-out"
                key={index}
              >
                <div className="w-40 h-40 mr-6 ml-2">
                  <img className="w-40 h-40 rounded-md" src={e.image} />
                </div>
                <div className="font-semibold text-lg flex flex-1 flex-col justify-center gap-8">
                  <div className="">{e.name}</div>
                  <div className="text-base">値段: {e.price}</div>
                  <div className="text-base text-mainShade flex-1 cursor-pointer w-3/5 flex justify-end items-end">
                    <div className="">交換ポイント</div>
                    <span className="p-1">
                      <TbPlayerTrackNext></TbPlayerTrackNext>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <span
            className={
              hasNext
                ? "text-2xl text-main font-semibold cursor-pointer"
                : "text-2xl text-red-300 font-semibold cursor-pointer"
            }
            onClick={handleNextClick}
          >
            <TbPlayerTrackNext></TbPlayerTrackNext>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AppealFood;
