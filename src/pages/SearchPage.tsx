import React, { useContext, useState } from "react";
import RestaurantSearchCard from "../components/RestaurantSearchCard/RestaurantSearchCard";
import PaginationSearch from "../components/PaginationSearch";
import Restaurant from "../models/restaurants"
import { getRestaurantsByName, getRestaurantIdsByFoodName } from "../services/RestaurantApi";
import { searchOption as Option}  from "../models/enum/searchOption";
import Footer from "../components/Footer";
import { searchContext } from "../App";

const SearchPage = () => {
    const [searchData, setSearchData] = useState<Restaurant[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [allFood, setAllFood] = useState<any>([]);
    const {query, searchOption} = useContext(searchContext);
    
    const restaurantsPerPage = 5;

    React.useEffect(() => {
        async function getAllFood() {
            const data : any = await getRestaurantsByName('');
            setAllFood(data);
            
        }
        getAllFood();
    }, [])

    React.useEffect(() => {
        async function getSearchData(name : string) {
            const suitableData = allFood.filter((e : Restaurant) => e.name.toLowerCase().includes(name.trim().toLowerCase()));
            setSearchData([...suitableData]);
           
        }
        async function getSearchDataByFood(name : string) {
            const data : any = await getRestaurantIdsByFoodName(name);
            const suitableData = allFood.filter((e : Restaurant) => data.includes(e.id?.trim()));
            setSearchData([...suitableData]);
        }
       
        if(searchOption === Option.RestaurantSearch) {
            getSearchData(query);
        }

        else if(searchOption === Option.FoodSearch) {
           getSearchDataByFood(query);  
        }
        
        setCurrentPage(1);
    }, [searchOption, allFood, query]);

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = searchData.length > restaurantsPerPage ? searchData.slice(indexOfFirstRestaurant, indexOfLastRestaurant)
    : searchData;

    const paginate = (pageNumber : number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            {(searchData.length > 0) ?
                <div>
                    {query.trim() === "" ? <h1 className="mb-8 text-2xl font-semibold flex">全部で {searchData.length}レストランがある </h1> : 
                        <h1 className="mb-8 text-2xl font-semibold flex">{searchData.length} 結果が見つけた： "{query}"</h1>
                    } 
                    
                    {currentRestaurants.map((e) => {
                        // console.log(e);
                        return (
                            <RestaurantSearchCard key={e.id} restaurant={e} searchOption={searchOption} searchKeyword={query}/>
                        ) 
                    })}
                    <PaginationSearch 
                        restaurantsPerPage ={restaurantsPerPage}
                        totalRestaurants ={searchData.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </div>
                : <div className="mx-auto max-w-[75rem] h-[25rem]">
                    {searchOption === Option.FoodSearch ? <h1 className="mb-8 text-2xl font-semibold flex">このフード名が見つけない："{query}"</h1>
                    : <h1 className="mb-8 text-2xl font-semibold flex">適切なレストランが見つけない："{query}"</h1>}
                </div>
            }
            <Footer />
            
        </React.Fragment>
    )
}

export default SearchPage;