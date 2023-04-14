import { Button, ListGroup, TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";
import Tweet from "../components/layout/Tweet";

export default function Explore() {
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
        <form className="relative rounded-lg bg-white">
          <TextInput
            type="text"
            placeholder="Search"
            required={true}
            className="shadow-md shadow-gray-300"
          />
          <BiSearch className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-400 hover:text-blue-500" />
        </form>
        <ul className="w-full space-y-7 py-4">
          {/* <Tweet />
          <Tweet /> */}
        </ul>
      </section>
    </main>
  );
}
