import { Alert, ListGroup } from "flowbite-react";
import Tweet from "../components/layout/Tweet";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";
import superjson from "superjson";
import { useState } from "react";
import MediaTab from "../components/profile/MediaTab";
import LikesTab from "../components/profile/LikesTab";
import BookmarkTweetTab from "../components/bookmark/BookmarkTweetTab";
import BookmarkLikeTab from "../components/bookmark/BookmarkLikeTab";
import BookmarkMediaTab from "../components/bookmark/BookmarkMediaTab";

export default function Bookmarks({
  userSession,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentTab, setCurrentTab] = useState<"TWEETS" | "MEDIA" | "LIKES">(
    "TWEETS"
  );

  if (!userSession) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Please Login first!</span>
        </span>
      </Alert>
    );
  }

  return (
    <main className="mx-auto grid w-[80rem] max-w-full grid-cols-1 gap-6 py-6 px-4 md:grid-cols-4">
      <div className="col-span-1 w-full">
        <ListGroup>
          <ListGroup.Item
            active={currentTab === "TWEETS"}
            onClick={() => setCurrentTab("TWEETS")}
          >
            Tweets
          </ListGroup.Item>
          <ListGroup.Item
            active={currentTab === "MEDIA"}
            onClick={() => setCurrentTab("MEDIA")}
          >
            Media
          </ListGroup.Item>
          <ListGroup.Item
            active={currentTab === "LIKES"}
            onClick={() => setCurrentTab("LIKES")}
          >
            Likes
          </ListGroup.Item>
        </ListGroup>
      </div>

      {currentTab === "TWEETS" && (
        <BookmarkTweetTab userSession={userSession} />
      )}
      {currentTab === "LIKES" && <BookmarkLikeTab userSession={userSession} />}
      {currentTab === "MEDIA" && <BookmarkMediaTab userSession={userSession} />}
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userSession = await getSession(context);

  // if (userSession === null) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //     props: { userSession },
  //   };
  // }

  // const ssg = createProxySSGHelpers({
  //   router: appRouter,
  //   ctx: createInnerTRPCContext({ session: userSession }),
  //   transformer: superjson,
  // });

  // await ssg.user.getUser.prefetch({ userID: userSession.user.id });

  return {
    props: {
      // trpcState: ssg.dehydrate(),
      userSession,
    },
  };
}
