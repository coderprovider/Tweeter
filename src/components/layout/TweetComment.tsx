import { Avatar } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { RouterOutputs } from "../../utils/api";
import { formatDate } from "../../utils/utilityFunctions";

interface CommentProps {
  comment: RouterOutputs["comment"]["getComments"][number];
}

export default function TweetComment({ comment }: CommentProps) {
  return (
    <div className="mt-6 flex items-start gap-4">
      <Avatar
        img={
          comment.user.image
            ? comment.user.image
            : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        }
        className="hidden sm:block"
      />
      <div className="flex-1">
        <div className="rounded-lg bg-gray-100 p-3">
          <h3 className="flex items-center gap-3 text-base font-bold capitalize text-black">
            <span>{comment.user.name}</span>
            <time
              dateTime={comment.createdAt.toString()}
              className="hidden text-xs font-medium text-gray-400 sm:block"
            >
              {formatDate(comment.createdAt)}
            </time>
          </h3>
          <p className="text-base font-medium text-gray-700">{comment.text}</p>
          {comment.image && (
            <div className="relative mt-3 h-40 w-full">
              <Image
                src={comment.image}
                alt="comment cover"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center space-x-4 border-gray-100 text-xs font-medium text-gray-400">
          <span className="flex cursor-pointer items-center text-sm font-medium text-gray-400 hover:text-red-500">
            <FaRegHeart className="mr-1.5 text-base" /> Like
          </span>
          <span className="text-gray-40 text-sm font-medium">
            {comment._count.likes} Likes
          </span>
        </div>
      </div>
    </div>
  );
}
