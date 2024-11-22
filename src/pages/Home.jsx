/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomButton,
  Loading,
  Navbar,
  noProfile,
  ProfileCard,
} from "../components";
import FriendsCard from "../components/FriendsCard";
import FriendRequest from "../components/FriendRequest";
import { suggest, requests, posts } from "../assets/data";
import FriendSuggestion from "../components/FriendSuggestion";
import Post from "../components/Post";
import PostCard from "../components/PostCard";
import EditProfile from "../components/EditProfile";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

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

          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg pt-5">
            <Post user={user} post={posts} />
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
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

      {edit && <EditProfile/>}
    </>
  );
};

export default Home;
