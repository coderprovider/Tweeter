import { ListGroup } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Tweet from "../components/layout/Tweet";
import UserBio from "../components/profile/UserBio";
import { useState } from "react";

const FollowingModal = dynamic(
  () => import("../components/profile/FollowingModal"),
  { ssr: false }
);

export default function Profile() {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

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
        <UserBio setToggleModal={setToggleModal} />

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

      <FollowingModal
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
      />
    </>
  );
}
