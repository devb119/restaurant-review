import React from 'react'
import { RestaurantCard, Section } from '../../components'


let restaurantLists = [
  {
    title: "Bo To Quan Moc",
    rating: 4.5,
    address: "21 Hoa Lu, Hai Ba Trung",
    imageUrl: "/img/nhahang.png",
  },
  {
    title: "Bo To Quan Moc",
    rating: 4.5,
    address: "21 Hoa Lu, Hai Ba Trung",
    imageUrl: "/img/nhahang.png",
  },
  {
    title: "Bo To Quan Moc",
    rating: 4.5,
    address: "21 Hoa Lu, Hai Ba Trung",
    imageUrl: "/img/nhahang.png",
  },
  {
    title: "Bo To Quan Moc",
    rating: 4.5,
    address: "21 Hoa Lu, Hai Ba Trung",
    imageUrl: "/img/nhahang.png",
  },
  {
    title: "Bo To Quan Moc",
    rating: 4.5,
    address: "21 Hoa Lu, Hai Ba Trung",
    imageUrl: "/img/nhahang.png",
  },

];
function Restaurants() {
    return (
      <Section title="レストラン">
        <div className="flex">
          {restaurantLists.map((i, index) => (
            <RestaurantCard
              title={i.title}
              rating={i.rating}
              address={i.address}
              imageUrl={i.imageUrl}
              key={index}
            ></RestaurantCard>
          ))}
        </div>
      </Section>
    );
}

export default Restaurants