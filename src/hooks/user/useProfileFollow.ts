import { toast } from "react-hot-toast";
import { RouterOutputs, api } from "../../utils/api";

interface Props {
  loggedInUserID?: string;
  profileUserID?: string;
  from: "BIO" | "SUGGEST" | "FOLLOWING" | "FOLLOWED";
}

export default function useProfileFollow({
  loggedInUserID,
  profileUserID,
  from,
}: Props) {
  const utils = api.useContext();

  const { mutate, isLoading } = api.follow.followUser.useMutation({
    onSuccess: (data, ctx) => {
      toast.success("Followed successfully");

      if (from === "BIO") {
        // * Must pass logged in userID
        utils.user.getUser.setData(
          { userID: ctx.followUserID },
          (old: RouterOutputs["user"]["getUser"] | undefined) => {
            if (old === undefined) return old;
            return {
              ...old,
              followedBy: [{ id: loggedInUserID! }],
              _count: { ...old._count, followedBy: old._count.followedBy + 1 },
            };
          }
        );
        utils.follow.getFollowedBy.invalidate({ userID: ctx.followUserID });
      } else if (from === "SUGGEST") {
        utils.follow.suggestToFollow.setData(
          undefined,
          (old: RouterOutputs["follow"]["suggestToFollow"] | undefined) => {
            if (old === undefined) return old;
            return [...old.filter((d) => d.id !== data)];
          }
        );
        utils.tweet.getTweets.invalidate();
      } else if (from === "FOLLOWING") {
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
                      followedByIDs: [...u.followedByIDs, loggedInUserID!],
                    }
                  : u
              ),
            ];
          }
        );
      } else if (from === "FOLLOWED") {
        if (profileUserID! === loggedInUserID!) {
          utils.user.getUser.setData(
            { userID: profileUserID },
            (old: RouterOutputs["user"]["getUser"] | undefined) => {
              if (old === undefined) return old;
              return {
                ...old,
                followedBy: [{ id: loggedInUserID! }],
                _count: { ...old._count, following: old._count.following + 1 },
              };
            }
          );
          utils.follow.getFollowing.invalidate({ userID: profileUserID });
        }

        utils.follow.getFollowedBy.setData(
          { userID: profileUserID! },
          (old: RouterOutputs["follow"]["getFollowedBy"] | undefined) => {
            if (old === undefined) return old;
            return [
              ...old.map((u) =>
                u.id === data
                  ? {
                      ...u,
                      followedByIDs: [...u.followedByIDs, loggedInUserID!],
                    }
                  : u
              ),
            ];
          }
        );
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}
