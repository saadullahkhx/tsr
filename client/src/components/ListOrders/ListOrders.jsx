import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../redux/actions/ordersActions";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import MetaData from "../../MetaData";
import "./ListOrders.css";
import { Link } from "react-router-dom";
import Table from "../Table/Table";

const ListOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const columns = useMemo(
    () => [
      {
        Header: "My Orders",
        columns: [
          {
            Header: "Order ID",
            accessor: "_id",
            Cell: ({ cell: { value } }) => {
              return (
                <>
                  {value && (
                    <Link
                      to={`/order/${value}`}
                      style={{ color: "blue", margin: "0 1rem" }}
                    >
                      {value}
                    </Link>
                  )}
                </>
              );
            },
          },

          {
            Header: "Status",
            accessor: "orderStatus",
            Cell: ({ cell: { value } }) => {
              return (
                <>
                  {value && String(value).includes("Delivered") ? (
                    <p style={{ color: "green", margin: "0 1rem" }}>{value}</p>
                  ) : (
                    <p style={{ color: "red", margin: "0 1rem" }}>{value}</p>
                  )}
                </>
              );
            },
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      {orders.length > 0 ? (
        <Table columns={columns} data={orders} />
      ) : (
        <div style={{ width: "100%", margin: "1rem 0" }}>
          <h3>My Orders</h3>
          <p sty>No Recent Orders</p>
        </div>
      )}
    </div>
  );
};

export default ListOrders;
