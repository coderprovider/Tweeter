import { QueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Button, Card, Sidebar, Spinner } from "flowbite-react";
import Image from "next/image";
import { api, RouterOutputs } from "../../utils/api";
import { useState } from "react";

interface Props {
  suggestToFollow: RouterOutputs["follow"]["suggestToFollow"] | undefined;
  queryClient: QueryClient;
}

export default function ToFollow({ suggestToFollow, queryClient }: Props) {
  const [showLoadingFor, setShowLoadingFor] = useState<string>("");

  const { mutate, isLoading } = api.follow.followUser.useMutation({
    onSuccess: (data) => {
      setShowLoadingFor("");
      const suggestFollowQueryKey = getQueryKey(
        api.follow.suggestToFollow,
        undefined,
        "query"
      );
      const tweetsQueryKey = getQueryKey(
        api.tweet.getTweets,
        undefined,
        "query"
      );
      queryClient.setQueryData(
        suggestFollowQueryKey,
        (old: RouterOutputs["follow"]["suggestToFollow"] | undefined) => {
          if (old === undefined) {
            return old;
          }
          return [...old.filter((d) => d.id !== data)];
        }
      );
      queryClient.invalidateQueries({ queryKey: tweetsQueryKey });
    },
  });

  function followUser(followUserID: string) {
    mutate({ followUserID });
    setShowLoadingFor(followUserID);
  }

  return (
    <div className="styledScrollbar max-h-[435.6px] w-full">
      <Card>
        <div className="flex items-center justify-between border-0 border-b-2 border-solid border-gray-200 pb-1.5">
          <h4 className="text-sm font-semibold text-black">Who to follow</h4>
          {/* <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a> */}
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {suggestToFollow ? (
              suggestToFollow.map((s) => (
                <li key={s.id} className="py-3 sm:py-4">
                  <div className="flex items-center lg:space-x-4">
                    <img
                      className="hidden h-8 w-8 shrink-0 rounded-full lg:block"
                      src={s.image ?? undefined}
                      alt="Michael image"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {s.name}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {s.email}
                      </p>
                    </div>
                    <Button
                      size="xs"
                      onClick={() => followUser(s.id)}
                      className={`text-center ${
                        isLoading && showLoadingFor === s.id
                          ? "pointer-events-none"
                          : "pointer-events-auto"
                      }`}
                    >
                      {isLoading && showLoadingFor === s.id ? (
                        <Spinner
                          aria-label="Default status example"
                          size="lg"
                        />
                      ) : (
                        "Follow"
                      )}
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center">
                <Spinner aria-label="Default status example" size="md" />
              </div>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
}
