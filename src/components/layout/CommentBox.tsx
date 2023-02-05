import { Avatar, TextInput } from "flowbite-react";
import { BiImageAlt } from "react-icons/bi";

export default function CommentBox() {
  return (
    <form className="flex items-center gap-4">
      <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
      <fieldset className="relative flex-1">
        <TextInput
          type="text"
          placeholder="Tweet your reply"
          required={true}
          className="rounded-lg border border-solid border-gray-200"
        />
        <BiImageAlt className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-400 hover:text-blue-500" />
      </fieldset>
    </form>
  );
}
