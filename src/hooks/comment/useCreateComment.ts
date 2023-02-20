import { QueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { api, RouterOutputs } from "../../utils/api";

interface Props {
  queryClient: QueryClient;
  tweetID: string;
  setText: Dispatch<SetStateAction<string>>;
  setPhoto: Dispatch<
    SetStateAction<{
      name: string;
      url: string;
    }>
  >;
}

export default function useCreateComment({
  queryClient,
  setText,
  setPhoto,
  tweetID,
}: Props) {
  const { mutate, isLoading } = api.comment.createComment.useMutation({
    onSuccess: (data) => {
      setText("");
      setPhoto({ name: "", url: "" });
      queryClient.setQueryData(
        [
          ["comment", "getComments"],
          {
            input: tweetID,
            type: "query",
          },
        ],
        (old: RouterOutputs["comment"]["getComments"] | undefined) => {
          if (old === undefined) {
            return [data];
          }
          return [data, ...old];
        }
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error("Server error. Please try again later😓");
    },
  });

  return { mutate, isLoading };
}
