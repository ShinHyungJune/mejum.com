import React, {Component} from 'react';
import Review from './Review';

const Reviews = ({store, mutateStore, reviews, mutateReviews, setReviewsParams, reviewsParams, editReview}) => {
    const remove = (review) => {
        mutateReviews({
            ...reviews,
            data: reviews.data.filter(reviewData => reviewData.id !== review.id)
        }, false);
    
        mutateStore({...store, reviewsCount: store.reviewsCount - 1}, false);
        
        axios.delete("/api/reviews/" + review.id);
    };
    
    const toggleImgFilter = () => {
        if(reviewsParams.notNull === "img")
            return setReviewsParams({...reviewsParams, notNull: ""});
            
        return setReviewsParams({...reviewsParams, notNull: "img"});
    };
    return (
        <div className={"reviews"}>
            <div className="reviews__top">
                <div className="fragment">
                    <p className="count">리뷰 {store.reviewsCount}개</p>
                    
                    <button className="btn--create" onClick={() => window.setPop("리뷰 작성")}>리뷰작성</button>
                </div>
                
                <div className="fragment">
                    <button className={`btn--filter btn--img ${reviewsParams.notNull === "img" ? "active" : ""}`} onClick={toggleImgFilter}>사진리뷰만</button>
                    
                    <div className="btns">
                        <button className={`btn--filter ${reviewsParams.orderBy === "updated_at" && reviewsParams.align === "desc" ? "active" : ""}`}
                                onClick={() => setReviewsParams({...reviewsParams, orderBy: "updated_at", align: "desc"})}>최신순</button>
                        <button className={`btn--filter ${reviewsParams.orderBy === "updated_at" && reviewsParams.align === "asc" ? "active" : ""}`}
                                onClick={() => setReviewsParams({...reviewsParams, orderBy: "updated_at", align: "asc"})}>오래된순</button>
                        <button className={`btn--filter ${reviewsParams.orderBy === "point" && reviewsParams.align === "desc" ? "active" : ""}`}
                                onClick={() => setReviewsParams({...reviewsParams, orderBy: "point", align: "desc"})}>별점순</button>
                    </div>
                </div>
            </div>
            
            {
                reviews ? reviews.data.map(review => <Review review={review} key={review.id} remove={remove} editReview={editReview}/>)
                        : <div className={"loading type03 animated infinite flash"}>불러오는중</div>
            }
         
        </div>
    );

};

export default Reviews;
