import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { toast } from "react-hot-toast";
import { api, RouterOutputs } from "../../utils/api";

interface Props {
  profileUserId: string;
  loggedInUserID: string;
}

export default function useUnfollowUser({
  profileUserId,
  loggedInUserID,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = api.follow.unFollowUser.useMutation({
    onError: (err) => {
      console.log(err);
      toast.error("Server error. Please try again later😓");
    },
    onSuccess: (data) => {
      toast.success("Successfully un followed");

      if (profileUserId === loggedInUserID) {
        const getFollowingQueryKey = getQueryKey(
          api.follow.getFollowing,
          { userID: profileUserId },
          "query"
        );
        queryClient.setQueryData(
          getFollowingQueryKey,
          (old: RouterOutputs["follow"]["getFollowing"] | undefined) => {
            if (!old) return old;
            return [...old.filter((u) => u.id !== data)];
          }
        );
      }
    },
  });

  return { mutate, isLoading };
}
