import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Table from "../../components/Table/Table";
import MetaData from "../../MetaData";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import "./OrdersList.css";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../redux/actions/ordersActions";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";

const OrdersList = () => {
  const history = useHistory();
  const columns = [
    {
      Header: "All Orders",
      columns: [
        {
          Header: "Order ID",
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
                      }}
                      onClick={() =>
                        history.push(`/admin/order/update/${value}`)
                      }
                    />
                    <BsFillTrashFill
                      style={{
                        color: "red",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteOrder(value)}
                    />
                    {value}
                  </span>
                )}
              </>
            );
          },
        },

        {
          Header: "No Of Items",
          accessor: "orderItems.length",
        },
        {
          Header: "Amount",
          accessor: "totalPrice",
        },
        {
          Header: "Status",
          accessor: "orderStatus",
        },
      ],
    },
  ];
  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order deleted");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted]);

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="orders-list">
      <MetaData title="All Orders" />
      <DashboardSidebar />
      {loading ? <Loader /> : <Table columns={columns} data={orders} />}
    </div>
  );
};

export default OrdersList;
