import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Table from "../Table/Table";
import MetaData from "../../MetaData";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./ProductsList.css";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../redux/actions/productsActions";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productsConstants";

const ProductsList = () => {
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const history = useHistory();
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  const columns = [
    {
      Header: "All Products",
      columns: [
        {
          Header: "Product ID",
          accessor: "_id",
          Cell: ({ cell: { value } }) => {
            return (
              <>
                {value && (
                  <span>
                    <AiFillEdit
                      style={{
                        fontSize: "14px",
                        cursor: "pointer",
                        marginRight: "3px",
                      }}
                      onClick={() =>
                        history.push(`/admin/product/update/${value}`)
                      }
                    />
                    <BsFillTrashFill
                      style={{
                        color: "red",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteProduct(value)}
                    />
                    {value}
                  </span>
                )}
              </>
            );
          },
        },

        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Price",
          accessor: "price",
        },
        {
          Header: "Stock",
          accessor: "stock",
        },
      ],
    },
  ];
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted]);
  return (
    <div className="products-list">
      <MetaData title="All Products" />
      <DashboardSidebar />
      {loading ? <Loader /> : <Table columns={columns} data={products} />}
    </div>
  );
};

export default ProductsList;
