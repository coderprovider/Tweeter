import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api } from "../../utils/api";
import { Alert, Spinner } from "flowbite-react";
import Tweet from "../layout/Tweet";
import { getQueryKey } from "@trpc/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";

interface Props {
  userSession: Session;
  srcQuery: string;
}

export default function TopTab({ userSession, srcQuery }: Props) {
  const [parent] = useAutoAnimate();
  const queryClient = useQueryClient();

  const { data, isLoading, isRefetching } = api.explore.topTweets.useQuery(
    { srcQuery: "" },
    {
      refetchOnMount: true,
    }
  );

  return (
    <ul ref={parent} className="space-y-7 py-4 md:col-span-3">
      {isLoading || isRefetching ? (
        <div className="mt-6 flex justify-center">
          <Spinner size="lg" aria-label="Default status example" />
        </div>
      ) : data && data.length ? (
        data.map((t) => (
          <Tweet
            key={t.id}
            tweet={t}
            userSession={userSession}
            queryClient={queryClient}
            dataKey={getQueryKey(
              api.explore.topTweets,
              { srcQuery: "" },
              "query"
            )}
          />
        ))
      ) : (
        <Alert color="info">
          <span>
            <span className="font-medium">No tweets found!</span>
          </span>
        </Alert>
      )}
    </ul>
  );
}
