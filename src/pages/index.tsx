import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import CreateTweet from "../components/home/CreateTweet";
import ToFollow from "../components/home/ToFollow";
import Trends from "../components/home/Trends";
import Tweet from "../components/layout/Tweet";
import { api } from "../utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="mx-auto flex w-[80rem] max-w-full flex-col-reverse gap-6 py-6 px-4 md:grid md:grid-cols-4">
      <section className="md:col-span-3">
        <CreateTweet />
        <ul className="space-y-7 py-6">
          <Tweet />
          <Tweet />
        </ul>
      </section>
      <aside className="space-y-6 md:col-span-1">
        <Trends />
        <ToFollow />
      </aside>
    </main>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
