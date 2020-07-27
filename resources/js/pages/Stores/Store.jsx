import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

const Store = ({store, edit}) => {
    let [isWidthLong, setIsWidthLong] = useState(false);
    
    useEffect(() => {
        let img = new Image();
    
        img.src = store.img.url;
    
        img.onload = () => {
            if(img.width > img.height)
                return setIsWidthLong(true);
    
            setIsWidthLong(false);
        };
    }, []);
    
    return (
        <Link to={`/stores/${store.group_id}/${store.id}`} className={`store ${isWidthLong ? "widthLong" : "heightLong"}`}>
            <div className="ratioBox-wrap">
                <div className="ratioBox">
                    <img src={store.img.url} alt=""/>
                </div>
            </div>
            
           <p className="store__title">{store.title}</p>
        </Link>
    );
};

export default Store;
