import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import { noProfile } from ".";

const FriendRequest = ({ request, handleFriendRequest }) => {
  const [showMore, setShowMore] = useState(false);
  const defaultCount = 3;

  const displayedRequests = showMore ? request : request?.slice(0, defaultCount);

  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
      <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
        <span>Friend Request</span>
        <span>{request?.length}</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {displayedRequests?.map(({ _id, requestFrom: from }) => (
          <div key={_id} className="flex items-center justify-between">
            <Link
              to={"/profile/" + from._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={from?.profileUrl ?? noProfile}
                alt={from?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {from?.firstName} {from?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {from?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
            <div className="flex gap-1">
              <CustomButton
                title="Accept"
                containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                onClick={() => handleFriendRequest(_id, "Accepted")}
              />
              <CustomButton
                title="Deny"
                containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                onClick={() => handleFriendRequest(_id, "Denied")}
              />
            </div>
          </div>
        ))}
      </div>
      {request?.length > defaultCount && (
        <button
          className="text-blue-500 text-sm mt-3 underline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default FriendRequest;
