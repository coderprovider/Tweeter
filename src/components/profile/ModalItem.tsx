import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { api, RouterOutputs } from "../../utils/api";

interface Props {
  user: RouterOutputs["follow"]["getFollowing"][number];
}

export default function ModalItem({ user }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = api.follow.unFollowUser.useMutation({
    onError: (err) => {
      console.log(err);
      toast.error("Server error. Please try again later😓");
    },
    onSuccess: (data) => {
      toast.success("Successfully un followed");
      const getFollowingQueryKey = getQueryKey(
        api.follow.getFollowing,
        undefined,
        "query"
      );
      queryClient.setQueryData(
        getFollowingQueryKey,
        (old: RouterOutputs["follow"]["getFollowing"] | undefined) => {
          if (!old) return old;
          return [...old.filter((u) => u.id !== data)];
        }
      );
    },
  });

  function userUnFollow() {
    mutate({ unFollowUserID: user.id });
  }

  return (
    <li className="border-0 border-b-2 border-solid border-gray-200 py-3 sm:py-4">
      <div className="flex flex-wrap justify-between space-x-4">
        <div className="flex items-center sm:space-x-4">
          <img
            className="hidden h-9 w-9 shrink-0 rounded-lg sm:block"
            src={
              user.image ||
              "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            }
            alt="user pic"
          />
          <div className="flex-1">
            <p className="truncate text-base font-bold text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {user.followedByIDs.length} followers
            </p>
          </div>
        </div>
        <Button
          onClick={userUnFollow}
          color="failure"
          className={`text-center ${
            isLoading ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          {isLoading ? (
            <Spinner
              color="failure"
              aria-label="Default status example"
              size="md"
            />
          ) : (
            "Un Follow"
          )}
        </Button>
      </div>
      <p className="mt-3 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </li>
  );
}
