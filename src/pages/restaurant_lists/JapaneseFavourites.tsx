
import { Favorite, FavoriteCard2, Section } from "../../components";
import React, { useEffect } from "react";
import Restaurants from "./Restaurants";
import { getFavouriteFoodList } from "../../services/FoodApi";
import Loading from "../../components/common/Loading";

const favorites = [
  {
    title: "Bun cha",
    imageURL: "/img/buncha.jpg",
  },
  {
    title: "Cha ca",
    imageURL: "/img/chaca.jpg",
  },
  {
    title: "Pho Bo",
    imageURL: "/img/phobo.jpg",
  },
  {
    title: "Nem",
    imageURL: "/img/banhmi.png",
    rating: 4.5,
  },
  {
    title: "Banh Mi",
    imageURL: "/img/banhmi.png",
    rating: 4.5,
  },
  {
    title: "Banh Mi",
    imageURL: "/img/banhmi.png",
    rating: 4.5,
  },
  {
    title: "Banh Mi",
    imageURL: "/img/banhmi.png",
    rating: 4.5,
  },
  {
    title: "Banh Mi",
    imageURL: "/img/banhmi.png",
    rating: 4.5,
  },
];

function JapaneseFavourites() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [favorites, setFavorites] = React.useState<any>([]);
  // const [hasPrev, setHasPrev] = React.useState(false);
  // const [hasNext, setHasNext] = React.useState(true);

  // const handleNextBtnClicked = () => {
  //   setHasNext(true);
  // };
  // const handlePrevBtnClicked = () => {
  //   setHasPrev(true);
  // };
  // let enableStyle = "text-4xl  text-mainShade m-2 cursor-pointer",
  //   disableStyle =
  //     "text-4xl text-red-400 m-2 cursor-not-allowed";
  useEffect(() => {
    setLoading(true);

    getFavouriteFoodList()
      .then((res) => setFavorites(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Section title="日本人好み料理">
      {loading ? (
        <div className="flex justify-center h-420 items-center">
          <Loading></Loading>
        </div>
      ) : (
        <div>
          <div className="flex relative">
            <div className="w-3/5 flex gap-4">
              {favorites.slice(0, 3).map((i: any, index: number) => (
                <Favorite
                  foodTitle={i.name}
                  imageUrl={i.image}
                  key={index}
                  restaurant_id=""
                />
              ))}
            </div>
            <div className="w-2/5 absolute -z-10 right-10 -top-20">
              <div>
                <img src="/img/lemon.png" className="w-full" />
                {/* <img src="/img/buncha.jpg" className="absolute" /> */}
              </div>
            </div>
          </div>
          {/* <div className="flex justify-around w-3/5">
          <div className="flex flex-row mt-2">
            <span
              className={hasPrev ? enableStyle : disableStyle}
              onClick={handleNextBtnClicked}
            >
              <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
            </span>
            <span
              className={hasNext ? enableStyle : disableStyle}
              onClick={handlePrevBtnClicked}
            >
              <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
            </span>
          </div>
        </div> */}
          <div className="flex flex-row mt-4 mb-8">
            {favorites.slice(3, 8).map((i: any, index: number) => (
              <FavoriteCard2
                foodTitle={i.name}
                imageUrl={i.image}
                key={index}
                rating={i.rating}
                restaurant_id={i.restaurant_id}
              ></FavoriteCard2>
            ))}
          </div>
          <div id="restaurants" className="mb-8">
            <Restaurants></Restaurants>
          </div>
        </div>
      )}
    </Section>
  );
}

export default JapaneseFavourites;
