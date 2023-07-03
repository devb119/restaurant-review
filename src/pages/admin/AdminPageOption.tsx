type paginateFunction = (pageNumber : number) => void;

const AdminPageOption = ({ restaurantsPerPage, totalRestaurants, paginate, currentPage } : {restaurantsPerPage : number, totalRestaurants : number, paginate : paginateFunction, currentPage : number}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
        pageNumbers.push(i);
    }

    const getPageOptionHandler = (e : any) => {
        e.preventDefault();
        paginate(e.target.value);
        // e.target.value = currentPage;
    }

    return (
        <>
            <div >
                                    
                <select onClick={getPageOptionHandler} id="countries" className="bg-gray-50 border border-slate-400 text-gray-900 text-sm rounded-lg block w-full p-3 dark:bg-gray-700  dark:text-slate-600">
                    {/* <option selected >ページ</option> */}
                    {pageNumbers.map(number => (
                        <option value={number}>
                            <a key={number}  className='page-item'> 
                            {/* <a onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                            </a> */}
                               {number}                                                      
                            </a>
                        </option>
                       
                    ))}
                    
                </select>
            </div>
        </>
    )
}

export default AdminPageOption;