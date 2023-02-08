import { ListGroup } from "flowbite-react";
import Tweet from "../components/layout/Tweet";

export default function Bookmarks() {
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
            Tweets
          </ListGroup.Item>
          <ListGroup.Item>Tweets & Replies</ListGroup.Item>
          <ListGroup.Item>Media</ListGroup.Item>
          <ListGroup.Item>Likes</ListGroup.Item>
        </ListGroup>
      </div>

      <ul className="space-y-7 md:col-span-3">
        <Tweet />
        <Tweet />
      </ul>
    </main>
  );
}
