import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import ReactStarsRating from "react-awesome-stars-rating";
import "./ReviewBox.css";
import CustomButton from "../CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, newReview } from "../../redux/actions/productsActions";
import { NEW_REVIEW_RESET } from "../../redux/constants/productsConstants";

const ReviewBox = ({ productId }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const handleRatings = (e) => {
    e.preventDefault();

    dispatch(newReview({ rating, comment, productId }));
    setOpen(false);
  };

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review posted successfully!");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, reviewError, success]);

  return (
    <React.Fragment>
      <span
        onClick={onOpenModal}
        style={{
          fontSize: "16px",
          textDecoration: "underline",
          cursor: "pointer",
          margin: ".3rem 0",
        }}
      >
        Submit a review
      </span>
      <Modal open={open} onClose={onCloseModal}>
        <form onSubmit={handleRatings} className="rating-box-container">
          <h3 className="review-heading">Review Product</h3>
          <ReactStarsRating
            value={rating}
            onChange={(value) => setRating(value)}
            isEdit={true}
            size={40}
            isHalf={false}
            className="ratings-box"
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your feedback..."
            className="review-text"
          />

          <CustomButton>Submit</CustomButton>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ReviewBox;
