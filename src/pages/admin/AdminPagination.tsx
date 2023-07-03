type paginateFunction = (pageNumber : number) => void;

const AdminPagination = ({ restaurantsPerPage, totalRestaurants, paginate, currentPage } : {restaurantsPerPage : number, totalRestaurants : number, paginate : paginateFunction, currentPage : number}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex">
                        
                    <li>
                    <a
                        className="cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-[#F15F2C] dark:hover:text-white "
                        >Previous</a>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            {/* <a onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                            </a> */}
                                <a
                                    className={number === currentPage ? "text-white relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all duration-300 hover:bg-[#F15F2C] bg-[#F15F2C] dark:hover:text-white " : 
                                    "relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-[#F15F2C] dark:hover:bg-[#F15F2C] dark:hover:text-white"}
                                    href="#!"
                                    onClick={() => paginate(number)}
                                >{number}</a>
                                
                            
                        </li>
                    ))}
                    
                    <li>
                        <a
                            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-[#F15F2C] dark:hover:text-white"
                            href="#!"
                            >Next</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminPagination;