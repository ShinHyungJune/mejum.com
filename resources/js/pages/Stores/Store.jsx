import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';

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
