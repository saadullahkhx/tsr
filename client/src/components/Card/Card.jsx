import React from "react";
import "./Card.css";
import CustomButton from "../CustomButton/CustomButton";
import ReactStarsRating from "react-awesome-stars-rating";
import { Link } from "react-router-dom";

const Card = ({ name, price, ratings, images, numOfReviews, id, category }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="card">
        <img src={images[0].url} alt="product" />
        <span>{category}</span>
        <h3>{name}</h3>
        <p className="price">PKR.{price}/-</p>
        <div className="rating-and-reviews">
          <ReactStarsRating value={ratings} isEdit={false} size={15} />
          <p>({numOfReviews})</p>
        </div>
        <p>
          <CustomButton>View Product</CustomButton>
        </p>
      </div>
    </Link>
  );
};

export default Card;
