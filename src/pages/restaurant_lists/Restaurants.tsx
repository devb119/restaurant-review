import React from 'react'
import { RestaurantCard, Section } from '../../components'
import {getRestaurantsByName } from '../../services/RestaurantApi';


function Restaurants() {
  const [loading, setLoading] = React.useState(true);
  const [restaurantLists, setRestaurantLists] = React.useState<any>([]);
  React.useEffect(() => {
    getRestaurantsByName("").then((res) => setRestaurantLists(res.slice(0,5))).catch((err)=> console.log(err)).then(()=>{setLoading(false)});
  
  },[])

    return (
      <Section title="レストラン">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex">
            {restaurantLists.map((i: any, index: number) => (
              <RestaurantCard
                title={i.name}
                rating={i.rating}
                address={i.address}
                imageUrl={i.image}
                key={index}
              ></RestaurantCard>
            ))}
          </div>
        )}
      </Section>
    );
}

export default Restaurants