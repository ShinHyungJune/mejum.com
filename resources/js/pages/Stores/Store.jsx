import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import useSWR from "swr";

const Store = ({store, edit}) => {

    useSWR("/api/stores/" + store.id);

    return (
        <Link to={`/stores/${store.group_id}/${store.id}`} className={`store`}>
            <div className="ratioBox-wrap">
                <div className="ratioBox">
                    {store.img ?
                        <LazyLoadImage
                            effect="blur"
                            src={store.img.url}
                            placeholderSrc="/img/replace--store.jpg"
                        /> : null
                    }
                </div>
            </div>
            
           <p className="store__title">{store.title}</p>
        </Link>
    );
};

export default Store;
