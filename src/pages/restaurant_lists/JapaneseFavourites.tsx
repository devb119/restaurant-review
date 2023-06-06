import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Favorite, FavoriteCard2, Section } from "../../components";
import React from "react";

let favorites = [
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
  const [hasPrev, setHasPrev] = React.useState(false);
  const [hasNext, setHasNext] = React.useState(true);

  const handleNextBtnClicked = () => {
    setHasNext(true);
  };
  const handlePrevBtnClicked = () => {
    setHasPrev(true);
  };
  let enableStyle = "text-4xl  text-mainShade m-2 cursor-pointer",
    disableStyle =
      "text-4xl text-red-400 m-2 cursor-not-allowed";
  return (
    <Section title="日本人好み料理">
      <div>
        <div className="w-3/5 flex gap-4">
          {favorites.slice(0, 3).map((i, index) => (
            <Favorite
              foodTitle={i.title}
              imageUrl={i.imageURL}
              key={index}
            ></Favorite>
          ))}
        </div>
        <div className="flex justify-around w-3/5">
          <div className="flex flex-row mt-2">
            <span className={hasPrev ? enableStyle : disableStyle} onClick={handleNextBtnClicked}>
              <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
            </span>
            <span className={hasNext? enableStyle : disableStyle} onClick={handlePrevBtnClicked}>
              <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
            </span>
          </div>
        </div>
        <div className="flex flex-row mt-4">
          {favorites.slice(3).map((i, index) => (
            <FavoriteCard2
              foodTitle={i.title}
              imageUrl={i.imageURL}
              key={index}
              rating={i.rating}
            ></FavoriteCard2>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default JapaneseFavourites;
