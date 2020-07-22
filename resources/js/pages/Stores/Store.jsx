import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

const Store = ({store, edit}) => {

    return (
        <Link to={"/stores/" + store.id} className="store">
            <div className="ratioBox-wrap">
                <div className="ratioBox">
                    <img src={store.img} alt=""/>
                </div>
            </div>
            
           <p className="store__title">{store.title}</p>
        </Link>
    );
};

export default Store;
