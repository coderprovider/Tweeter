import { Alert, ListGroup } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Tweet from "../../components/layout/Tweet";
import UserBio from "../../components/profile/UserBio";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../utils/api";

const FollowingModal = dynamic(
  () => import("../../components/profile/FollowingModal"),
  { ssr: false }
);

export default function Profile({
  userSession,
  profileUserId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { data: currentUser } = api.user.getUser.useQuery(
    {
      userID: profileUserId,
    },
    { enabled: !!userSession, refetchOnMount: true }
  );

  if (!userSession) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Please Login first!</span> Profile not
          found.
        </span>
      </Alert>
    );
  }

  if (!currentUser) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Not found!</span> Profile not found.
        </span>
      </Alert>
    );
  }

  return (
    <>
      <figure className="relative h-72 w-full max-w-full">
        <Image
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt="tweet cover"
          className="object-cover"
          fill={true}
        />
      </figure>
      <main className="mx-auto w-[80rem] max-w-full px-4">
        <UserBio
          setToggleModal={setToggleModal}
          user={currentUser}
          userSession={userSession}
        />

        <section className="mx-auto grid max-w-full grid-cols-1 gap-6 py-6 md:grid-cols-4">
          <div className="col-span-1 w-full">
            <ListGroup>
              <ListGroup.Item
                active={true}
                onClick={function onClick() {
                  return alert("Profile clicked!");
                }}
              >
                Tweets
              </ListGroup.Item>
              <ListGroup.Item>Tweets & Replies</ListGroup.Item>
              <ListGroup.Item>Media</ListGroup.Item>
              <ListGroup.Item>Likes</ListGroup.Item>
            </ListGroup>
          </div>

          <ul className="space-y-7 md:col-span-3">
            {/* <Tweet />
            <Tweet /> */}
          </ul>
        </section>
      </main>

      {toggleModal && (
        <FollowingModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          userID={profileUserId}
          name={currentUser.name}
          userSession={userSession}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userSession = await getSession(context);

  if (context.params === undefined) {
    return {
      notFound: true,
    };
  }

  const profileUserId = context.params.id as string;

  if (userSession === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: { profileUserId, userSession },
    };
  }

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: userSession }),
    transformer: superjson,
  });

  await ssg.user.getUser.prefetch({ userID: profileUserId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userSession,
      profileUserId,
    },
  };
}
