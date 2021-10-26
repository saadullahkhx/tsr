import React from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import "./ListReviews.css";

const ListReviews = ({ reviews }) => {
  return (
    <React.Fragment>
      <div className="reviews-list">
        <h3>Reviews</h3>
        <hr />
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div className="review-container">
              <ReactStarsRating
                value={review.rating}
                isEdit={false}
                size={14}
              />
              <p>{review.comment}</p>
              <span style={{ fontSize: "16px", color: "gray" }}>
                Submitted by: {review.name}
              </span>
            </div>
          ))
        ) : (
          <p>No Reviews Found</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default ListReviews;
