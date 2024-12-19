/* eslint-disable no-unused-vars */
import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInputField from "./TextInputField";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { Logout } from "../redux/userSlice";
import { fetchPosts } from "../utils";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleSearch = async (data) => {
    await fetchPosts(user?.token,dispatch,"",data)
  };

  return (
    <div className="topbar w-full flex justify-between px-2 py-2 lg:px-20 items-center bg-primary">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          FunBook
        </span>
      </Link>

      <form
        className="hidden md:flex items-center justify-center pb-2"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInputField
          placeholder="Search..."
          styles="w-[18rem] lg:w-[38rem]  rounded-l-full py-3 "
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>

      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">

        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
