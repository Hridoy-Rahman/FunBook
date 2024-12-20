/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
} from "../components";
import FriendSuggestion from "../components/FriendSuggestion";

import {
  apiRequest,
  deletePost,
  fetchPosts,
  getUserInfo,
  handleFileUpload,
  likePost,
  sendFriendRequest,
} from "../utils";
import { useForm } from "react-hook-form";
import { userLogin } from "../redux/userSlice";

const FriendSuggestionPage = () => {
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post) || {};
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
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
  const fetchSuggestedFriend = async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggested-friends",
        token: user?.token,
        method: "POST",
      });

      setSuggestedFriends(res?.data);
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

  const getUser = async () => {
    const res = await getUserInfo(user?.token);
    const newData = { token: user?.token, ...res };
    dispatch(userLogin(newData));
  };

  useEffect(() => {
    setLoading(true);
    fetchSuggestedFriend();
    getUser();
  }, []);
  return (
    <div>
        <Navbar/>
      <div>
        <FriendSuggestion
          suggestion={suggestedFriends}
          handleRequest={handleFriendRequest}
        />
      </div>
    </div>
  );
};

export default FriendSuggestionPage;
