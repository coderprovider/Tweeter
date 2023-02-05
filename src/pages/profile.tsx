import { ListGroup } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Tweet from "../components/layout/Tweet";
// import FollowingModal from "../components/profile/FollowingModal";
import UserBio from "../components/profile/UserBio";

const FollowingModal = dynamic(
  () => import("../components/profile/FollowingModal"),
  { ssr: false }
);

export default function Profile() {
  return (
    <>
      <figure className="relative h-72 w-full">
        <Image
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt="tweet cover"
          className="object-cover"
          fill={true}
        />
      </figure>
      <main className="mx-auto w-[80rem]">
        <UserBio />

        <section className="mx-auto grid w-[80rem] grid-cols-4 gap-6 py-6">
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

          <ul className="col-span-3 space-y-7">
            <Tweet />
            <Tweet />
          </ul>
        </section>
      </main>

      <FollowingModal />
    </>
  );
}
