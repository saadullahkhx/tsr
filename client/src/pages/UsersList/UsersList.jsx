import React, { useEffect } from "react";
import Table from "../../components/Table/Table";
import MetaData from "../../MetaData";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import {
  allUsers,
  clearErrors,
  deleteUser,
} from "../../redux/actions/userActions";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import { useHistory } from "react-router";
import "./UsersList.css";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";

const UsersList = () => {
  const history = useHistory();
  const columns = [
    {
      Header: "All Users",
      columns: [
        {
          Header: "User ID",
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
                        history.push(`/admin/user/update/${value}`)
                      }
                    />
                    <BsFillTrashFill
                      style={{
                        color: "red",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteUserHandler(value)}
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
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Role",
          accessor: "role",
        },
      ],
    },
  ];
  const dispatch = useDispatch();

  const { loading, users, error } = useSelector((state) => state.allUsers);

  const { isDeleted } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User Deleted");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      <MetaData title="Users List" />
      <DashboardSidebar />
      <div className="users-admin-list">
        <Table columns={columns} data={users} />
      </div>
    </React.Fragment>
  );
};

export default UsersList;
