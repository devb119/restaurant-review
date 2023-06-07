import React from "react";
import "./RestaurantSearchCard.css";
import Restaurant from "../../models/restaurants";
import { getFoodsByRestaurantId } from "../../services/FoodApi";
import { FaStar } from "react-icons/fa";
import Loading from "../common/Loading";

const RestaurantSearch = ({ restaurant }: { restaurant: Restaurant }) => {
  const { id, name, address, image, rating } = restaurant;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [top2, setTop2] = React.useState<any>([]);
  if (!id) return <></>;

  React.useEffect(() => {
    setLoading(true);
    getFoodsByRestaurantId(id)
      .then((res) => {
        console.log(res);
        setTop2(res.sort((r1, r2) => r2.rating - r1.rating).slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="flex justify-center h-screen items-center">
          <Loading></Loading>
        </div>
      ) : (
        <div className="mb-8">
          <p className="text-2xl font-semibold mb-4 flex ">
            レストラン名：{name}
          </p>
          <div className="restaurant-search-info rounded">
            <div
              className="restaurant-search-image rounded"
              style={{ backgroundImage: `url("${image}")` }}
            ></div>
            <div className="restaurant-search-description-wrapper">
              <p className="restaurant-search-address">アドレス： {address}</p>
              <div className="restaurant-search-rating">
                <p>評価：</p>
                <div className="flex items-center gap-2">
                  <p>{rating}</p>
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
              <div className="flex font-semibold text-red-700 text-2xl">
                おすすめ:
              </div>
              {top2.map((e: any) => (
                <div className="food-thumbnail-wrapper grid gap-1 ml-40">
                  <div className="flex flex-row items-center">
                    <p className="py-1 font-semibold text-l">{e.name} </p>
                    <div className="flex items-center ml-4">
                      <p className="font-thin text-sm">( {e.rating}</p>
                      <span className="font-extrathin text-sm text-yellow-500 px-1">
                        <FaStar></FaStar>
                      </span>
                      )
                    </div>
                  </div>
                  <div className="w-52 h-36 overflow-hidden rounded-md">
                    <img src={e.image}></img>
                  </div>
                </div>
              ))}
              <div className="go-to-review ml-52">
                <div className="add-left-space"></div>
                <div className="flex">
                  <svg
                    width="9"
                    height="11"
                    viewBox="0 0 9 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.88805 4.69441C8.4768 5.0811 8.49191 5.93903 7.91716 6.34622L2.50806 10.1783C1.85236 10.6429 0.944288 10.1834 0.930133 9.37998L0.798501 1.90866C0.784345 1.10521 1.67567 0.614064 2.34733 1.05521L7.88805 4.69441Z"
                      fill="#171414"
                    />
                  </svg>
                  <svg
                    width="9"
                    height="11"
                    viewBox="0 0 9 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.88805 4.69441C8.4768 5.0811 8.49191 5.93903 7.91716 6.34622L2.50806 10.1783C1.85236 10.6429 0.944288 10.1834 0.930133 9.37998L0.798501 1.90866C0.784345 1.10521 1.67567 0.614064 2.34733 1.05521L7.88805 4.69441Z"
                      fill="#171414"
                    />
                  </svg>
                  <svg
                    width="9"
                    height="11"
                    viewBox="0 0 9 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.88805 4.69441C8.4768 5.0811 8.49191 5.93903 7.91716 6.34622L2.50806 10.1783C1.85236 10.6429 0.944288 10.1834 0.930133 9.37998L0.798501 1.90866C0.784345 1.10521 1.67567 0.614064 2.34733 1.05521L7.88805 4.69441Z"
                      fill="#171414"
                    />
                  </svg>
                </div>
                <a href="#">レビュー</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RestaurantSearch;
