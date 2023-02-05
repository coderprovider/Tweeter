import { Button, Card, Sidebar } from "flowbite-react";

export default function ToFollow() {
  return (
    <div className="w-full">
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
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
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
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie image"
                  />
                </div>
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
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </div>
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
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Lana image"
                  />
                </div>
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
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Thomas image"
                  />
                </div>
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
