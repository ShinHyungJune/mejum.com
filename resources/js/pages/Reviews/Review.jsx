import React, {Fragment, useEffect} from 'react';

const Review = ({review, editReview, remove}) => {

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
                <img src={review.img ? review.img.url : null} alt="" className="review__contents__img"/>

                <p className="review__contents__body">{review.body}</p>
            </div>
            
            {window.store.getState().commonStates.user.id === review.user.id ?
                <div className="review__btns">
                    <button className="review__btn red" onClick={() => remove(review)}>삭제</button>
                    <button className="review__btn" onClick={() => editReview(review)}>수정</button>
                </div> : null
            }
 
        </div>
    );
};

export default Review;
