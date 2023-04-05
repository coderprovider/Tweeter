import { toast } from "react-hot-toast";
import { RouterOutputs, api } from "../../utils/api";

interface Props {
  loggedInUserID: string;
}

export default function useProfileFollow({ loggedInUserID }: Props) {
  const utils = api.useContext();

  const { mutate, isLoading } = api.follow.followUser.useMutation({
    onSuccess: (data, ctx) => {
      toast.success("Followed successfully");

      utils.user.getUser.setData(
        { userID: ctx.followUserID },
        (old: RouterOutputs["user"]["getUser"] | undefined) => {
          if (old === undefined) return old;
          return {
            ...old,
            followedByIDs: [...old.followedByIDs, loggedInUserID],
          };
        }
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}
