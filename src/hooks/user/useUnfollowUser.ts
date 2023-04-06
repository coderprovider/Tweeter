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
  const utils = api.useContext();

  const { mutate, isLoading } = api.follow.unFollowUser.useMutation({
    onError: (err) => {
      console.log(err);
      toast.error("Server error. Please try again later😓");
    },
    onSuccess: (data) => {
      toast.success("Successfully un followed");

      if (profileUserId === loggedInUserID) {
        utils.follow.getFollowing.setData(
          { userID: profileUserId },
          (old: RouterOutputs["follow"]["getFollowing"] | undefined) => {
            if (!old) return old;
            return [...old.filter((u) => u.id !== data)];
          }
        );

        utils.user.getUser.setData(
          { userID: loggedInUserID },
          (old: RouterOutputs["user"]["getUser"] | undefined) => {
            if (old === undefined) return old;
            return { ...old, _count: { following: old._count.following - 1 } };
          }
        );
      } else {
        utils.user.getUser.setData(
          { userID: profileUserId },
          (old: RouterOutputs["user"]["getUser"] | undefined) => {
            if (old === undefined) return old;
            return {
              ...old,
              followedByIDs: [
                ...old.followedByIDs.filter((f) => f !== loggedInUserID),
              ],
            };
          }
        );
      }
    },
  });

  return { mutate, isLoading };
}
