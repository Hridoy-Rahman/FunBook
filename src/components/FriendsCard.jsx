import React, { useState } from "react";
import { Link } from "react-router-dom";
import { noProfile } from ".";

const FriendsCard = ({ friends }) => {
  const [showAllFriends, setShowAllFriends] = useState(false);
  
    const displayedAllFriends = showAllFriends ? friends : friends.slice(0, 3);
  return (
    <div>
      <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
        <div className='flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]'>
          <span className="text-xl "> Friends</span>
          <span className="text-xl ">{friends?.length}</span>
        </div>

        <div className='w-full flex flex-col gap-4 pt-4'>
          {displayedAllFriends?.map((friend) => (
            <Link
              to={"/profile/" + friend?._id}
              key={friend?._id}
              className='w-full flex gap-4 items-center cursor-pointer'
            >
              <img
                src={friend?.profileUrl ?? noProfile}
                alt={friend?.firstName}
                className='w-10 h-10 object-cover rounded-full'
              />
              <div className='flex-1'>
                <p className='text-base font-medium text-ascent-1'>
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className='text-sm text-ascent-2'>
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {friends?.length > 3 && (
        <button
          onClick={() => setShowAllFriends(!showAllFriends)}
          className="mt-4 text-sm text-ascent-2 hover:text-ascent-1"
        >
          {showAllFriends ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default FriendsCard;