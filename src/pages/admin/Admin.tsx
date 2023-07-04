import React, { useState } from "react";
import { Loading } from "../../components/common";
import AdminSideBar from "./AdminSideBar";
import { Unauthorized } from "..";
import { UserRole } from "../../models/enum";
import { getRestaurantsByName, updateRestaurant } from "../../services/RestaurantApi";
import Restaurant from "../../models/restaurants";
import { getManagerNameByRestaurantID } from "../../services/UserApi";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { HiCheckCircle, HiOutlineCheckCircle, HiOutlineEye } from "react-icons/hi";
import AdminPagination from "./AdminPagination";
import AdminPageOption from "./AdminPageOption";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";


export const paginationContext = React.createContext({currentPage: 1})

const Admin = () => {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [popUpNoti, setPopUpNoti] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const restaurantsPerPage = 5;
    
    React.useEffect(() => {
        setLoading(true);

        async function getManagerFullName(id : any) {
            const  fullname = await getManagerNameByRestaurantID(id);
            return fullname;
        }

        async function getAllRestaurants(name: string) {
            let data : any = await getRestaurantsByName('');
            data = data.filter((e : Restaurant) => e.name.toLowerCase().includes(name.trim().toLowerCase()));
            setRestaurants([...data]);
            for (let i=0; i<data.length; i++) {
                data[i].managerFullName = await getManagerFullName(data[i].id).then((e) => {
                    // console.log(e);
                    return e;
                });
            }
            for (let i=0; i<data.length; i++) {
                data[i].created_at = new Date();
            }
            console.log(data);
            setRestaurants(data);
            setLoading(false);
        }

        getAllRestaurants(searchQuery);
        setCurrentPage(1);
        setQuery("");
       
    }, [searchQuery])

    const paginate = (pageNumber : number) => {
        setCurrentPage(pageNumber);
        console.log(currentPage);
        window.scrollTo(0, 0);
    }

    const submitHandler = (e : any) => {
        e.preventDefault();
        setSearchQuery(query);
    }

    const statusUpdateHandler = (e : Restaurant) => {
        // e.is_active = !e.is_active;
        setPopUpNoti(true);
        updateRestaurant(e);
        setTimeout(() => location.reload(), 2000);
    }

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.length > restaurantsPerPage ? restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant) : restaurants

    return(
        <paginationContext.Provider value={{currentPage}}>
           
              
           
            <div className="flex">
                <div>
                    <AdminSideBar></AdminSideBar>
                </div>
                
                    <div className="my-0 mx-0 w-full flex flex-col items-center">
                        {popUpNoti &&  
                            <Snackbar open={true} autoHideDuration={6000} >
                                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                                    リクエストが更新しますた。
                                </Alert>
                            </Snackbar>
                        }
                        <div className="flex items-center  gap-12 flex-start w-full mb-12">
                            <AdminPageOption 
                                restaurantsPerPage ={restaurantsPerPage}
                                totalRestaurants ={restaurants.length}
                                
                                paginate={paginate}
                            />
                            <form
                                className="relative w-1/2"
                                onSubmit={submitHandler}
                            >
                                <div className="relative rounded-3xl">
                                <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
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
                                    className="absolute right-2 top-1/2 -translate-y-1/2  text-slate-600 
                                    flex items-center gap-2 py-1 px-4 rounded-full  transition-all"
                                    type="submit"
                                    // onSubmit={(e) =>
                                    //   handleSubmitSearch(e, searchOption.RestaurantSearch)
                                    // }
                                >
                                    <div className="text-xl py-[3px]">
                                    <FiSearch />
                                    </div>
                                    
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
                            
                            <div className="overflow-hidden shadow-md  mb-10 sm:rounded-lg ">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 sm:rounded-lg ">
                                    <thead className="bg-[#f87171] text-white text-xl text-gray-700 font-medium uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                番号
                                            </th>
                                            <th scope="col" className="w-1/4 px-6 py-3">
                                                レストラン名
                                            </th>
                                            <th scope="col" className="w-1/4 px-6 py-3">
                                                オーナー名
                                            </th>
                                            <th scope="col" className="w-1/4 px-6 py-3">
                                                リクエスト日時
                                            </th>
                                            <th scope="col" className="px-6 py-3 ">
                                                行動
                                            </th>
                                        </tr>
                                    </thead>
                                    {loading ? <tbody className=" bg-white p-3 ">
                                                <td className="px-6 py-3"></td>
                                                <td className="w-1/4 px-6 py-3"></td>
                                                <td className="w-1/4 px-6 py-3"><Loading/></td>
                                                <td className="w-1/4 py-3"></td>
                                                
                                                <td className="px-6 py-3 "></td>
                                            </tbody> 
                                        : <tbody className="text-base">
                                        
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
                                                        {e.created_at ? e.created_at.toLocaleString() : ""}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                    
                                                        <div className="flex gap-2 text-2xl">
                                                            <span className="cursor-pointer" onClick={() => {
                                                                e.is_active = !e.is_active
                                                                statusUpdateHandler(e)}}>{e.is_active ? <MdOutlineCancel /> : <MdCancel fill="#f03e3e"/>}</span>
                                                            <span className="cursor-pointer" onClick={() => {
                                                                e.is_active = !e.is_active
                                                                statusUpdateHandler(e)}}>{e.is_active ? <HiCheckCircle fill="#51cf66"/> : <HiOutlineCheckCircle/>}</span>
                                                            <Link to={`../restaurants/${e.id}`}><HiOutlineEye /></Link>
                                                        </div>
                                                        
                                                    </td>
                                                </tr>
                                            ))}
                                       
                                        
                                       
                                        
                                        
                                    </tbody>}
                                </table>
                               
                            </div>
                                           
                        </div>
                        <div className="m-auto">
                            <AdminPagination 
                                restaurantsPerPage ={restaurantsPerPage}
                                totalRestaurants ={restaurants.length}
                                paginate={paginate}
                            />
                        </div>  
                    </div>  
                    
               
            </div>
            
            
        </paginationContext.Provider>
    )
}

export default Admin;
