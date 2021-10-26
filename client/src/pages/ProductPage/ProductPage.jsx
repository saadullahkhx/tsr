import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
} from "../../redux/actions/productsActions";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import Slider from "react-slick";
import ReactStarsRating from "react-awesome-stars-rating";
import MetaData from "../../MetaData";
import { addItemToCart } from "../../redux/actions/cartActions";
import "./ProductPage.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import ReviewBox from "../../components/ReviewBox/ReviewBox";
import { Link } from "react-router-dom";
import ListReviews from "../../components/ListReviews/ListReviews";

const ProductPage = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const { user } = useSelector((state) => state.user);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) {
      toast.error("Maximum stock for this product reached.");
      return;
    }

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(match.params.productId, quantity));
    toast.success("Item added to cart");
  };

  useEffect(() => {
    dispatch(getProductDetails(match.params.productId));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, match.params.productId]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="product-page">
        <MetaData title={product.name} />
        <div className="product-slider">
          <Slider {...settings}>
            {product.images &&
              product.images.map((image) => (
                <div key={image.public_id}>
                  <img src={image.url} alt={product.title} />
                </div>
              ))}
          </Slider>
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <span>Product # {product._id}</span>
          <div className="product-rating">
            <ReactStarsRating
              value={product.ratings}
              isEdit={false}
              size={15}
            />
            <p>({product.numOfReviews})</p>
          </div>
          <h4>Price: PKR.{product.price}/-</h4>
          <p className="stock-status">
            Status:{" "}
            {product.stock === 0 ? (
              <strong style={{ color: "red" }}>Out of stock</strong>
            ) : (
              <strong style={{ color: "green" }}>In Stock</strong>
            )}
          </p>
          <div className="qty-and-cart">
            <button className="qty-btn" onClick={decreaseQty}>
              -
            </button>
            <input type="number" className="count" readOnly value={quantity} />
            <button className="qty-btn" onClick={increaseQty}>
              +
            </button>
            <CustomButton disabled={product.stock === 0} onClick={addToCart}>
              Add To Cart
            </CustomButton>
          </div>
          {user ? (
            <ReviewBox productId={match.params.productId} />
          ) : (
            <Link
              to="/login"
              style={{ fontSize: "16px", textDecoration: "underline" }}
            >
              Please log in to submit a review
            </Link>
          )}

          <p className="product-description">{product.description}</p>
        </div>
      </div>

      <ListReviews reviews={product.reviews} />
    </div>
  );
};

export default ProductPage;
