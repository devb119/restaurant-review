import { Favorite, Section } from "../../components";

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
    imageURL: "/img/nem.png",
  },
  {
    title: "Nem",
    imageURL: "/img/nem.png",
  },
  {
    title: "Nem",
    imageURL: "/img/nem.png",
  },
  {
    title: "Nem",
    imageURL: "/img/nem.png",
  },
];

function JapaneseFavourites() {
  return (
    <Section title="日本人好み料理">
      <div className="w-3/5 flex gap-4">
        {favorites.slice(0,3).map((i, index) => (
          <Favorite
            foodTitle={i.title}
            imageUrl={i.imageURL}
            key={index}
          ></Favorite>
        ))}
      </div>
    </Section>
  );
}

export default JapaneseFavourites;
