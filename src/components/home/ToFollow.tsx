import { Button, Card, Sidebar } from "flowbite-react";
import Image from "next/image";

export default function ToFollow() {
  return (
    <div className="styledScrollbar max-h-[435.6px] w-full">
      <Card>
        <div className="flex items-center justify-between border-0 border-b-2 border-solid border-gray-200 pb-1.5">
          <h4 className="text-sm font-semibold text-black">Trends for you</h4>
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
              <div className="flex items-center space-x-4">
                <figure className="relative h-8 w-8 shrink-0">
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
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <figure className="relative h-8 w-8 shrink-0">
                  <Image
                    fill={true}
                    className="rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Michael image"
                  />
                </figure>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Bonnie Green
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <Button size="xs">Follow</Button>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <figure className="relative h-8 w-8 shrink-0">
                  <Image
                    fill={true}
                    className="rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </figure>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Michael Gough
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <Button size="xs">Follow</Button>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <figure className="relative h-8 w-8 shrink-0">
                  <Image
                    fill={true}
                    className="rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Michael image"
                  />
                </figure>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Lana Byrd
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <Button size="xs">Follow</Button>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center space-x-4">
                <figure className="relative h-8 w-8 shrink-0">
                  <Image
                    fill={true}
                    className="rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Michael image"
                  />
                </figure>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Thomes Lean
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
