import React, {Component} from 'react';
import Review from './Review';

const Reviews = ({store, reviews, mutateReviews, setReviewsParams, reviewsParams}) => {


    if(reviews)
        return (
            <div className={"reviews"}>
                <div className="reviews__top">
                    <div className="fragment">
                        <p className="count">리뷰 {store.reviewsCount}개</p>

                        <button className="btn--create" onClick={() => window.setPop("리뷰 작성")}>리뷰작성</button>
                    </div>

                    {/*<div className="fragment">
                        <button className="btn--filter btn--img">사진리뷰만</button>

                        <div className="btns">
                            <button className="btn--filter">최신순</button>
                            <button className="btn--filter">오래된순</button>
                            <button className="btn--filter">별점순</button>
                        </div>
                    </div>*/}
                </div>

                {reviews.data.map(review => <Review review={review} key={review.id} />)}
            </div>
        );

    return null;
};

export default Reviews;
