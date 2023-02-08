import { Button } from "flowbite-react";
import Image from "next/image";

export default function ModalItem() {
  return (
    <li className="border-0 border-b-2 border-solid border-gray-200 py-3 sm:py-4">
      <div className="flex flex-wrap justify-between space-x-4">
        <div className="flex items-center sm:space-x-4">
          <figure className="relative hidden h-9 w-9 shrink-0 sm:block">
            <Image
              fill={true}
              className="rounded-lg"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael image"
            />
          </figure>
          <div className="flex-1">
            <p className="truncate text-base font-bold text-gray-900 dark:text-white">
              Michael Gough
            </p>
            <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              120k followers
            </p>
          </div>
        </div>
        <Button>Follow</Button>
      </div>
      <p className="mt-3 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </li>
  );
}
