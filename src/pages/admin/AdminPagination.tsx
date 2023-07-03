import { useContext } from "react";
import { paginationContext } from "./Admin";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type paginateFunction = (pageNumber : number) => void;

const AdminPagination = ({ restaurantsPerPage, totalRestaurants, paginate } : {restaurantsPerPage : number, totalRestaurants : number, paginate : paginateFunction}) => {
    const pageNumbers = [];
    const data = useContext(paginationContext);

    for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginateHandler = (number : any) => {
        data.currentPage = number;
        paginate(number);
    }

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex gap-1">
                        
                    <li>
                    <a
                        onClick={() => paginate(data.currentPage - 1 > 0 ? data.currentPage - 1 : 1)}
                        className="cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-[#F15F2C] dark:hover:text-white "
                        ><div className="flex w-3 h-5 items-center justify-center "><AiOutlineArrowLeft/></div></a>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            {/* <a onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                            </a> */}
                                <a
                                    className={number === data.currentPage ? "text-white relative block rounded px-3 py-1.5 text-sm  transition-all duration-300 hover:bg-[#F15F2C] bg-[#F15F2C] dark:hover:text-white " : 
                                    "relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-[#F15F2C] dark:hover:bg-[#F15F2C] dark:hover:text-white"}
                                    href="#!"
                                    onClick={() => {paginateHandler(number)}
                                        }
                                ><div className="flex w-3 h-5 items-center justify-center ">{number}</div></a>
                                
                            
                        </li>
                    ))}
                    
                    <li>
                        <a
                            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-[#F15F2C] dark:hover:text-white"
                            href="#!"
                            onClick={() => paginate(data.currentPage + 1 < pageNumbers.length ? data.currentPage + 1 : pageNumbers.length)}
                            >
                                <div className="flex w-3 h-5 items-center justify-center  "><AiOutlineArrowRight/></div>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminPagination;