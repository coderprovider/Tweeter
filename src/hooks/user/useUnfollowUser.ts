import { toast } from "react-hot-toast";
import { api, RouterOutputs } from "../../utils/api";

interface Props {
  profileUserID: string;
  loggedInUserID: string;
  from: "BIO" | "FOLLOWING";
}

export default function useUnfollowUser({
  profileUserID,
  loggedInUserID,
  from,
}: Props) {
  const utils = api.useContext();

  const { mutate, isLoading } = api.follow.unFollowUser.useMutation({
    onError: (err) => {
      console.log(err);
      toast.error("Server error. Please try again later😓");
    },
    onSuccess: (data) => {
      toast.success("Successfully un followed");

      if (from === "BIO") {
        utils.user.getUser.setData(
          { userID: profileUserID },
          (old: RouterOutputs["user"]["getUser"] | undefined) => {
            if (old === undefined) return old;
            return {
              ...old,
              followedBy: [],
              _count: { ...old._count, followedBy: old._count.followedBy - 1 },
            };
          }
        );
      } else if (profileUserID === loggedInUserID && from === "FOLLOWING") {
        utils.follow.getFollowing.setData(
          { userID: profileUserID },
          (old: RouterOutputs["follow"]["getFollowing"] | undefined) => {
            if (!old) return old;
            return [...old.filter((u) => u.id !== data)];
          }
        );

        utils.user.getUser.setData(
          { userID: profileUserID },
          (old: RouterOutputs["user"]["getUser"] | undefined) => {
            if (old === undefined) return old;
            return {
              ...old,
              _count: { ...old._count, following: old._count.following - 1 },
            };
          }
        );
      } else if (profileUserID !== loggedInUserID && from === "FOLLOWING") {
        // * Must pass logged in userID and profile userID
        utils.follow.getFollowing.setData(
          { userID: profileUserID! },
          (old: RouterOutputs["follow"]["getFollowing"] | undefined) => {
            if (old === undefined) return old;
            return [
              ...old.map((u) =>
                u.id === data
                  ? {
                      ...u,
                      followedByIDs: [
                        ...u.followedByIDs.filter((f) => f !== loggedInUserID),
                      ],
                    }
                  : u
              ),
            ];
          }
        );
      }
    },
  });

  return { mutate, isLoading };
}
