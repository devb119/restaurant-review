import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Favorite, FavoriteCard2, Section } from "../../components";

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
            <span className="text-4xl  text-mainShade m-2">
              <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
            </span>
            <span className="text-4xl  text-mainShade m-2">
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