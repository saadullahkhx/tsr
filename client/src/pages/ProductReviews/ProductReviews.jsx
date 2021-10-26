import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import MetaData from "../../MetaData";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsFillTrashFill } from "react-icons/bs";
import "./ProductReviews.css";
import {
  getProductReviews,
  clearErrors,
  deleteReview,
} from "../../redux/actions/productsActions";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import { useHistory } from "react-router";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { DELETE_REVIEW_RESET } from "../../redux/constants/productsConstants";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const columns = [
    {
      Header: "Reviews",
      columns: [
        {
          Header: "Review ID",
          accessor: "_id",
          Cell: ({ cell: { value } }) => {
            return (
              <>
                {value && (
                  <span>
                    <BsFillTrashFill
                      style={{
                        color: "red",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteReviewHandler(value)}
                    />
                    {value}
                  </span>
                )}
              </>
            );
          },
        },

        {
          Header: "Rating",
          accessor: "rating",
        },
        {
          Header: "Comment",
          accessor: "comment",
        },
        {
          Header: "User ID",
          accessor: "user",
        },
      ],
    },
  ];
  const dispatch = useDispatch();

  const { loading, reviews, error } = useSelector(
    (state) => state.productReviews
  );

  const { isDeleted } = useSelector((state) => state.review);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      toast.success("Review Deleted");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, productId, isDeleted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getProductReviews(productId));
  };

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };
  return loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      <MetaData title="Reviews" />
      <DashboardSidebar />
      <div className="reviews-admin-list" style={{ marginLeft: "200px" }}>
        <form onSubmit={handleSubmit}>
          <CustomInput
            placeholder="Review ID"
            onChange={(e) => setProductId(e.target.value)}
          />
          <CustomButton>Search</CustomButton>
        </form>
        <Table columns={columns} data={reviews} />
      </div>
    </React.Fragment>
  );
};

export default ProductReviews;
