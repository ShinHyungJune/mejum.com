import React, {useState, useEffect} from 'react';

const Pagination = ({meta = {last_page: 0, current_page: 0}, changePage = () => {}}) => {
    let [pages, setPages] = useState([]);

    let className;

    useEffect(() => {
        pages = [];

        for(let i = 0; i < meta.last_page; i++){

            className = i+1 === meta.current_page ? "pagination__page primary active" : "pagination__page primary";

            pages.push((<button key={i} className={className} onClick={() => changePage(i + 1)}>{i + 1}</button>));

            setPages([...pages]);
        }
    }, [meta]);

    return (
        meta.last_page > 1 ?
            <div className="pagination type01 scroll-smooth scrollbar">
                <div className="pagination__container bg--sub">
                    {pages}
                </div>
            </div> : null
    );
};

export default Pagination;