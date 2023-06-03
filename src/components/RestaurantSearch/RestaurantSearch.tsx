import React, { useState } from "react";
import "./RestaurantSearch.css"
import Rate from "../Rate";

const RestaurantSearch = () => {
    const [rating, setRating] = useState(4);
    return (
        <React.Fragment>
            <div className="restaurant-search-container">
                <p className="restaurant-search-name">レストラン名</p>
                <div className="restaurant-search-info">
                    <div className="restaurant-search-image"></div>
                    <div className="restaurant-search-description-wrapper">
                        <p className="restaurant-search-address">アドレス</p>
                        <div className="restaurant-search-rating">
                            <p>評価：</p>
                            <div className="flex">
                                <Rate
                                    rating={rating}
                                    onRating={(rate : number) => setRating(rate)}
                                    count={5}
                                />
                                    
                            </div>
                        </div>
                        <div className="food-thumbnail-wrapper">
                            <p className="food-thumbnail-title">フード名</p>
                            <div className="food-thumbnail-image"></div>
                        </div>
                        <div className="food-thumbnail-wrapper food-thumbnail-wrapper--second">
                            <p className="food-thumbnail-title">フード名</p>
                            <div className="food-thumbnail-image"></div>
                        </div>
                        <div className="go-to-review">
                            <div className="add-left-space"></div>
                            <div className="flex">
                                <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.88805 4.69441C8.4768 5.0811 8.49191 5.93903 7.91716 6.34622L2.50806 10.1783C1.85236 10.6429 0.944288 10.1834 0.930133 9.37998L0.798501 1.90866C0.784345 1.10521 1.67567 0.614064 2.34733 1.05521L7.88805 4.69441Z" fill="#171414"/>
                                </svg>
                                <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.88805 4.69441C8.4768 5.0811 8.49191 5.93903 7.91716 6.34622L2.50806 10.1783C1.85236 10.6429 0.944288 10.1834 0.930133 9.37998L0.798501 1.90866C0.784345 1.10521 1.67567 0.614064 2.34733 1.05521L7.88805 4.69441Z" fill="#171414"/>
                                </svg>
                                <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.88805 4.69441C8.4768 5.0811 8.49191 5.93903 7.91716 6.34622L2.50806 10.1783C1.85236 10.6429 0.944288 10.1834 0.930133 9.37998L0.798501 1.90866C0.784345 1.10521 1.67567 0.614064 2.34733 1.05521L7.88805 4.69441Z" fill="#171414"/>
                                </svg>
                            </div>
                            <a href="#">レビュー</a>    
                        </div>
                    </div>
                </div>
            </div>

            

           
        </React.Fragment>
    )
}

export default RestaurantSearch;