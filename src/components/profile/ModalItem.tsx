import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Button, Spinner } from "flowbite-react";
import { Session } from "next-auth";
import Image from "next/image";
import { toast } from "react-hot-toast";
import useUnfollowUser from "../../hooks/user/useUnfollowUser";
import { api, RouterOutputs } from "../../utils/api";
import Link from "next/link";

interface Props {
  user: RouterOutputs["follow"]["getFollowing"][number];
  userSession: Session;
  profileUserId: string;
}

export default function ModalItem({ user, userSession, profileUserId }: Props) {
  // TODO: Have to fix this mutation. userID must be changed
  const { mutate: unFollowMutate, isLoading: unFollowLoading } =
    useUnfollowUser({
      profileUserId,
      loggedInUserID: userSession.user.id,
    });

  function userUnFollow() {
    unFollowMutate({ unFollowUserID: user.id });
  }

  return (
    <li className="border-0 border-b-2 border-solid border-gray-200 py-3 sm:py-4">
      <div className="flex flex-wrap justify-between space-x-4">
        <div className="flex items-center sm:space-x-4">
          <Link href={`/profile/${user.id}`}>
            <img
              className="hidden h-9 w-9 shrink-0 rounded-lg sm:block"
              src={
                user.image ||
                "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              }
              alt="user pic"
            />
          </Link>
          <div className="flex-1">
            <Link href={`/profile/${user.id}`}>
              <p className="truncate text-base font-bold text-gray-900 dark:text-white">
                {user.name}
              </p>
            </Link>
            <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {user.followedByIDs.length} followers
            </p>
          </div>
        </div>
        {profileUserId === userSession.user.id ? (
          <Button
            onClick={userUnFollow}
            color="failure"
            className={`text-center ${
              unFollowLoading ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {unFollowLoading ? (
              <Spinner
                color="failure"
                aria-label="Default status example"
                size="md"
              />
            ) : (
              "Un Follow"
            )}
          </Button>
        ) : null}
      </div>
      <p className="mt-3 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </li>
  );
}
