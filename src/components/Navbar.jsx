/* eslint-disable no-unused-vars */
import React from "react";
import { TbSocial } from "react-icons/tb";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineRequestPage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextInputField from "./TextInputField";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { Logout } from "../redux/userSlice";
import { fetchPosts } from "../utils";
import { LiaUserFriendsSolid } from "react-icons/lia";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (data) => {
    await fetchPosts(user?.token, dispatch, "", data);
  };

  return (
    <div className="sticky top-0">
      {/* Top Navbar */}
      <div className="topbar w-full flex flex-row justify-between px-2 py-2 lg:px-20 items-center bg-primary">
        {/* Logo Section */}
        <Link to="/" className="flex gap-2 items-center">
          <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
            <TbSocial />
          </div>
          <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
            FunBook
          </span>
        </Link>

        {/* Search Section */}
        <form
          className="flex items-center justify-center md:w-auto md:mt-0"
          onSubmit={handleSubmit(handleSearch)}
        >
          <TextInputField
            placeholder="Search..."
            styles="w-[5rem]  lg:w-[24rem] h-[24px] lg:h-[40px] rounded-l-full py-2 text-sm"
            register={register("search")}
          />
          <CustomButton
            title="Search"
            type="submit"
            containerStyles="bg-[#0444a4] text-white text-sm px-2 h-[24px] lg:h-[40px] lg:px-6 py-2.5 mt-2 rounded-r-full"
          />
        </form>

        {/* Logout Button */}
        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl mt-2 md:mt-0">
          <CustomButton
            onClick={() => dispatch(Logout())}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="fixed bottom-0 w-full bg-primary flex justify-around items-center py-2 shadow-lg lg:hidden">
        <button onClick={() => navigate("/")}>
          <AiOutlineHome className="text-xl text-ascent-1" />
          <p className="text-xs text-white">Home</p>
        </button>
        <button onClick={() => navigate("/friend-requests")}>
          <MdOutlineRequestPage className="text-xl text-ascent-1" />
          <p className="text-xs text-white">Requests</p>
        </button>
        <button onClick={() => navigate("/friend-suggestions")}>
          <LiaUserFriendsSolid className="text-xl text-ascent-1" />
          <p className="text-xs text-white">Suggestions</p>
        </button>
        <button onClick={() => navigate(`/profile/${user?._id}`)}>
          <AiOutlineUser className="text-xl text-ascent-1" />
          <p className="text-xs text-white">Profile</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
