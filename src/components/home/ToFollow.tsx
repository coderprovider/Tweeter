import { Button, Card, Sidebar } from "flowbite-react";
import Image from "next/image";

export default function ToFollow() {
  return (
    <div className="styledScrollbar max-h-[435.6px] w-full">
      <Card>
        <div className="flex items-center justify-between border-0 border-b-2 border-solid border-gray-200 pb-1.5">
          <h4 className="text-sm font-semibold text-black">Who to follow</h4>
          {/* <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a> */}
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center lg:space-x-4">
                <figure className="relative hidden h-8 w-8 shrink-0 lg:block">
                  <Image
                    fill={true}
                    className="rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Michael image"
                  />
                </figure>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Neil Sims
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <Button size="xs">Follow</Button>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
