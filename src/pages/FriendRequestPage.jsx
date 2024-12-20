/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components";

import FriendRequest from "../components/FriendRequest";

import { apiRequest, getUserInfo, sendFriendRequest } from "../utils";
import { useForm } from "react-hook-form";

import { userLogin } from "../redux/userSlice";

const FriendRequestPage = () => {
  const { user } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    formState: { errors },
  } = useForm();

  const fetchFriendRequest = async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: user?.token,
        method: "POST",
      });

      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(user.token, id);
      await fetchFriendRequest();
    } catch (error) {
      console.log(error);
    }
  };
  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status },
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const res = await getUserInfo(user?.token);
    const newData = { token: user?.token, ...res };
    dispatch(userLogin(newData));
  };

  useEffect(() => {
    setLoading(true);
    fetchFriendRequest();
    getUser();
  }, []);
  return (
    <div>
      <Navbar />
      <div className=" bg-primary mt-4">
        <FriendRequest
          request={friendRequest}
          handleFriendRequest={acceptFriendRequest}
        />
      </div>
    </div>
  );
};

export default FriendRequestPage;
