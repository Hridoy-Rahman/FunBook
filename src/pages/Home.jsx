/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  Loading,
  Navbar,
  noProfile,
  ProfileCard,
  TextInputField,
} from "../components";
import FriendsCard from "../components/FriendsCard";
import FriendRequest from "../components/FriendRequest";
import { suggest, requests } from "../assets/data";
import FriendSuggestion from "../components/FriendSuggestion";
import PostCard from "../components/PostCard";
import EditProfile from "../components/EditProfile";
import { apiRequest, fetchPosts, handleFileUpload, likePost } from "../utils";
import { useForm } from "react-hook-form";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { BsFiletypeGif } from "react-icons/bs";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post) || {};
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg("");
    try {
      const uri = file && (await handleFileUpload(file));
      const newData = uri ? { ...data, image: uri } : data;

      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        reset({
          description: "",
        });
        setFile(null);
        setErrMsg("");
        await fetchPost();
      }

      setPosting(false);
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  const fetchPost = async () => {
   
      await fetchPosts(user?.token, dispatch);
      setLoading(false)
    }

  const handleLikePost = async (uri) => {
    await likePost({uri:uri, token: user?.token});
    await fetchPost();
  };


  useEffect(() => {
    setLoading(true);
    fetchPost();
  }, []);
  return (
    <>
      <div className="w-full px-0  bg-bgColor">
        <Navbar />

        <div className="w-full flex gap-2 lg:px-20 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="w-1/4 flex flex-col gap-4 py-4">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 pt-5 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className="bg-primary px-4 rounded-lg"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? noProfile}
                  alt="UserImage"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <TextInputField
                  styles="w-full rounded-full py-5"
                  placeholder="What's on your mind...."
                  name="description"
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="vgifUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col pt-5 pb-10 gap-8 overflow-y-auto">
            {/* FRIEND REQUEST */}
            <FriendRequest request={friendRequest} />

            {/* SUGGESTED FRIENDS */}
            <FriendSuggestion suggestion={suggest} />
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;
