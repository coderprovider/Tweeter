import { QueryClient } from "@tanstack/react-query";
import { api, RouterOutputs } from "../../utils/api";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

interface Props {
  queryClient: QueryClient;
  setText: Dispatch<SetStateAction<string>>;
  setPhoto: Dispatch<
    SetStateAction<{
      name: string;
      url: string;
    }>
  >;
}

export default function useCreateTweet({
  queryClient,
  setText,
  setPhoto,
}: Props) {
  const { mutate, isLoading } = api.tweet.createTweet.useMutation({
    onSuccess: (data) => {
      setText("");
      setPhoto({ name: "", url: "" });
      toast.success("Created successfully😊");
      queryClient.setQueryData(
        [
          ["tweet", "getTweets"],
          {
            type: "query",
          },
        ],
        (oldData: RouterOutputs["tweet"]["getTweets"] | undefined) => {
          if (oldData === undefined) {
            return [data];
          }
          return [data, ...oldData];
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
