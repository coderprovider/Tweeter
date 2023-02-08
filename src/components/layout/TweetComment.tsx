import { Avatar } from "flowbite-react";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

export default function TweetComment() {
  return (
    <div className="mt-4 flex items-start gap-4">
      <Avatar
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        className="hidden sm:block"
      />
      <div className="flex-1">
        <div className="rounded-lg bg-gray-100 p-3">
          <h3 className="flex items-center gap-3 text-base font-bold capitalize text-black">
            <span>peyton leyons</span>
            <time
              dateTime="1985-12-30"
              className="hidden text-xs font-medium text-gray-400 sm:block"
            >
              December 30, 1985
            </time>
          </h3>
          <p className="text-base font-medium text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus, vitae.
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-4 border-gray-100 text-xs font-medium text-gray-400">
          <span className="flex cursor-pointer items-center text-sm font-medium text-gray-400 hover:text-red-500">
            <FaRegHeart className="mr-1.5 text-base" /> Like
          </span>
          <span className="text-gray-40 text-sm font-medium">59k Likes</span>
        </div>
      </div>
    </div>
  );
}
