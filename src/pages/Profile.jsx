import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading, Navbar, ProfileCard } from "../components";
import FriendsCard from "../components/FriendsCard";
import PostCard from "../components/PostCard";
import { deletePost, fetchPosts, getUserInfo, likePost } from "../utils";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post) || {};
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const uri = `/posts/get-user-post/${id}`;

  const getUser = useCallback(async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfo(res);
  }, [user?.token, id]);

  const getPosts = useCallback(async () => {
    setLoading(true);
    await fetchPosts(user?.token, dispatch, uri);
    setLoading(false);
  }, [user?.token, dispatch, uri]);

  const handleDelete = async (postId) => {
    await deletePost(postId, user?.token);
    await getPosts();
  };

  const handleLikePost = async (uri) => {
    await likePost({ uri, token: user?.token });
    await getPosts();
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, [getUser, getPosts]);

  return (
    <div className="w-full h-screen bg-bgColor overflow-auto">
      <Navbar />
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:px-20 md:pl-4 pt-5 pb-10">
        {/* LEFT */}
        <div className="w-full lg:w-1/4 md:w-1/3 flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={userInfo} />
          {/* FriendsCard shown on mobile */}
          <div className="lg:hidden block">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>

        {/* CENTER */}
        <div className="flex-1 h-full bg-primary flex flex-col gap-6 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : posts?.length > 0 ? (
            posts?.map((post) => (
              <PostCard
                post={post}
                key={post?._id}
                user={user}
                deletePost={handleDelete}
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
        <div className="hidden lg:flex w-1/4 h-full flex-col gap-8 overflow-y-auto">
          <FriendsCard friends={userInfo?.friends} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
