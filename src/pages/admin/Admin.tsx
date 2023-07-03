import React, { useState } from "react";
import { Loading } from "../../components/common";
import AdminSideBar from "./AdminSideBar";
import { Unauthorized } from "..";
import { UserRole } from "../../models/enum";
import { getRestaurantsByName } from "../../services/RestaurantApi";
import Restaurant from "../../models/restaurants";
import { getManagerNameByRestaurantID } from "../../services/UserApi";
import { MdOutlineCancel } from "react-icons/md";
import { HiOutlineCheckCircle, HiOutlineEye } from "react-icons/hi";
import AdminPagination from "./AdminPagination";
import { BsCheckLg } from "react-icons/bs";
import AdminPageOption from "./AdminPageOption";

const Admin = () => {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const restaurantsPerPage = 5;
    
    React.useEffect(() => {
        setLoading(false);
        async function getManagerFullName(id : any) {
            const  fullname = await getManagerNameByRestaurantID(id);
            return fullname;
        }

        async function getAllRestaurants() {
            const data : any = await getRestaurantsByName('');
            for (let i=0; i<data.length; i++) {
                data[i].managerFullName = await getManagerFullName(data[i].id).then((e) => {
                    // console.log(e);
                    return e;
                });
            }
            // console.log(data);
            setRestaurants(data);
            setLoading(false);
        }

        getAllRestaurants();
       
    }, [])

    const paginate = (pageNumber : number) => {
        setCurrentPage(pageNumber);
        console.log(currentPage);
        window.scrollTo(0, 0);
    }

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.length > restaurantsPerPage ? restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant) : restaurants

    return(
        <React.Fragment>
            <div className="flex">
                <div>
                    <AdminSideBar></AdminSideBar>
                </div>
                {loading ? (
                <div className="m-auto"> <Loading></Loading> </div>
                ) : (
                    <div className="my-0 mx-0 w-full flex flex-col items-center">
                        <div className="flex items-center  gap-12 flex-start w-full mb-12">
                            <AdminPageOption 
                                restaurantsPerPage ={restaurantsPerPage}
                                totalRestaurants ={restaurants.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                            <form
                                className="relative w-1/2"
                                onSubmit={(e) => (console.log(e))}
                            >
                                <div className="relative rounded-3xl">
                                <input
                                type="text"
                                // value={query}
                                // onChange={(e) => setQuery(e.target.value)}
                                // className={
                                //     query === ""
                                //     ? "rounded-3xl py-3 pl-4 pr-32 w-full shadow-lg focus:outline-none"
                                //     : "rounded-t-3xl py-3 pl-4 pr-32 w-full shadow-lg focus:outline-none"
                                // }
                                className="rounded-3xl py-3 pl-4 pr-32 w-full shadow-lg focus:outline-none"
                                placeholder="料理、レストランの名前を入力"
                                />

                
                                </div>

                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-main text-white 
                                    flex items-center gap-2 py-1 px-4 rounded-full hover:bg-mainShade transition-all"
                                    type="submit"
                                    // onSubmit={(e) =>
                                    //   handleSubmitSearch(e, searchOption.RestaurantSearch)
                                    // }
                                >
                                    <div className="text-xl">
                                    <BsCheckLg />
                                    </div>
                                    <p>検索</p>
                                </button>
                            </form>
                        </div> 
                        
                        <div className="w-full">
                            {/* {user?.role === UserRole.RestaurantManager ? (
                            restaurant && restaurant.id ? (
                                <MenuTable restaurantId={restaurant.id} />
                            ) : (
                                <NoRestaurant />
                            )
                            ) : (
                            <Unauthorized />
                            )} */}      
                            
                            <div className="overflow-hidden shadow-md  mb-10 sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 sm:rounded-lg ">
                                    <thead className="bg-[#F15F2C] text-white text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                番号
                                            </th>
                                            <th scope="col" className="w-1/3 px-6 py-3">
                                                レストラン名
                                            </th>
                                            <th scope="col" className="w-1/4 px-6 py-3">
                                                オーナー名
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                リクエスト日時
                                            </th>
                                            <th scope="col" className="px-6 py-3 ">
                                                行動
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {currentRestaurants?.map((e, index) => (
                                            <tr key={e.id} className="odd:bg-white even:bg-slate-200 border-none  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    {(index + 1) + (currentPage - 1) * 5}
                                                </th>
                                            <td className="px-6 py-4">
                                                   {e.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {e.managerFullName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {/* {e.created_at ? e.created_at?.toLocaleString() : ""} */}
                                                    Test
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                   
                                                    <div className="flex gap-2 text-2xl">
                                                        <MdOutlineCancel />
                                                        <HiOutlineCheckCircle/>
                                                        <HiOutlineEye />
                                                    </div>
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                        
                                        
                                    </tbody>
                                </table>
                               
                            </div>
                                           
                        </div>
                        <div className="m-auto">
                            <AdminPagination 
                                restaurantsPerPage ={restaurantsPerPage}
                                totalRestaurants ={restaurants.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </div>  
                    </div>  
                    
                )}
            </div>
            
            
        </React.Fragment>
    )
}

export default Admin;