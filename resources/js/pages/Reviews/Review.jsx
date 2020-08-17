import React, {Fragment, useEffect} from 'react';

const Review = ({review}) => {

    let stars = [];

    for(let i=0; i<review.point; i++){
        stars.push(<img src="/img/star--active.png" alt="" key={i}/>);
    }

    return (
        <div className={"review"}>
            <div className="review__top">
                <div className="member--img ratioBox-wrap">
                    <div className="ratioBox">
                        <img src={review.user.img ? review.user.img.url : "/img/replace--avatar.png"} alt=""/>
                    </div>
                </div>

                <p className="review__top__name">{review.user.name}</p>

                <div className={`review__top__point`}>
                    {stars}
                </div>

                <p className="review__top__date">{review.updated_at}</p>
            </div>

            <div className="review__contents">
                <img src={review.img.url} alt="" className="review__contents__img"/>

                <p className="review__contents__body">{review.body}</p>
            </div>
        </div>
    );
};

export default Review;
