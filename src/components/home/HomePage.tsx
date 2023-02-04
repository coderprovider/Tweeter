import Tweet from "../layout/Tweet";
import CreateTweet from "./CreateTweet";

export default function HomePage() {
  return (
    <main className="mx-auto grid w-[75rem] grid-cols-3 gap-6 py-6">
      <section className="col-span-2">
        <CreateTweet />
        <ul className="py-6">
          <Tweet />
        </ul>
      </section>
      <aside className="col-span-1 bg-red-300"></aside>
    </main>
  );
}
