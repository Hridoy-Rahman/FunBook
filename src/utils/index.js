/* eslint-disable no-unused-vars */
import axios from "axios";
import { SetPosts } from "../redux/postSlice.js";

const API_URL = "https://funbook-backend.onrender.com/"


export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
formData.append("file", uploadFile);
formData.append("upload_preset", "socialmedia");

const cloudinaryURL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

try {
  const response = await axios.post(cloudinaryURL, formData);
  return response.data.secure_url;
} catch (error) {
  console.log(error);
}

};

export const fetchPosts = async (token, dispatch, uri, data) => {
  try {
    const res = await apiRequest({
      url: uri || "/posts",
      token: token,
      method: "POST",
      data: data || {},
    });
    dispatch(SetPosts(res?.data));
    // console.log(res?.data)
    return;
  } catch (error) {
    console.error(error);
  }
};

export const likePost = async ({ uri, token }) => {
  try {
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async ( id, token ) => {
  try {
    const res = await apiRequest({
      url: "/posts/" + id,
      token: token,
      method: "DELETE",
    });

    return;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (token, id) => {
  try {
    const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;

    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });

    if (res?.message === "Authentication Failed") {
      localStorage.removeItem("user");
      window.alert("User session expired. Login again");
      window.location.replace("/login");
    }
    return res?.user;
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/friend-request",
      token: token,
      method: "POST",
      data: { requestTo: id },
    });

    return;
  } catch (error) {
    console.log(error);
  }
};
export const viewUserProfile = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/profile-view",
      token: token,
      method: "POST",
      data: { id },
    });

    return;
  } catch (error) {
    console.log(error);
  }
};
