import { Alert, Button, ListGroup, TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";
import Tweet from "../components/layout/Tweet";
import { useState } from "react";
import TopTab from "../components/explore/TopTab";
import LatestTab from "../components/explore/LatestTab";
import PeopleTab from "../components/explore/PeopleTab";
import MediaTab from "../components/explore/MediaTab";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { api } from "../utils/api";
import { FormEvent } from "react";

export default function Explore({
  userSession,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentTab, setCurrentTab] = useState<
    "TOP" | "LATEST" | "PEOPLE" | "MEDIA"
  >("TOP");

  const [srcValue, setSrcValue] = useState<string>("");
  const utils = api.useContext();

  if (!userSession) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Please Login first!</span>
        </span>
      </Alert>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (currentTab === "TOP") {
      await utils.explore.topTweets.refetch({ srcQuery: srcValue });
    }
  }

  return (
    <main className="mx-auto grid w-[80rem] max-w-full grid-cols-1 gap-6 py-6 px-4 md:grid-cols-4">
      <div className="col-span-1 w-full">
        <ListGroup>
          <ListGroup.Item
            active={true}
            onClick={function onClick() {
              return alert("Profile clicked!");
            }}
          >
            Top
          </ListGroup.Item>
          <ListGroup.Item>Latest</ListGroup.Item>
          <ListGroup.Item>People</ListGroup.Item>
          <ListGroup.Item>Media</ListGroup.Item>
        </ListGroup>
      </div>

      <section className="md:col-span-3">
        <form className="relative rounded-lg bg-white" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search"
            required={true}
            value={srcValue}
            onChange={(e) => setSrcValue(e.target.value)}
            className="shadow-md shadow-gray-300"
          />
          <BiSearch className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-400 hover:text-blue-500" />
        </form>

        {currentTab === "TOP" && (
          <TopTab userSession={userSession} srcQuery={srcValue} />
        )}
        {currentTab === "LATEST" && <LatestTab />}
        {currentTab === "PEOPLE" && <PeopleTab />}
        {currentTab === "MEDIA" && <MediaTab />}
      </section>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userSession = await getSession(context);

  return {
    props: {
      userSession,
    },
  };
}
