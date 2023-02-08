import { Dropdown } from "flowbite-react";
import { Card, Button, Avatar, Textarea } from "flowbite-react";
import { BiImageAlt } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";

export default function CreateTweet() {
  return (
    <Card>
      <h5 className="border-0 border-b-2 border-solid border-gray-200 pb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Tweet something
      </h5>

      <div className="flex items-start gap-3">
        <Avatar
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          className="hidden sm:block"
        />

        <form onSubmit={(e) => e.preventDefault()} className="flex-1 space-y-3">
          <Textarea placeholder="What's happening?" required={true} rows={2} />
          <fieldset className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BiImageAlt className="cursor-pointer text-2xl text-blue-500" />

              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <h4 className="flex cursor-pointer items-center gap-2 text-blue-500">
                    <BsGlobe className="text-xl" />
                    <span className="hidden text-base font-semibold sm:block">
                      Everyone can reply
                    </span>
                  </h4>
                }
              >
                <Dropdown.Header>
                  <span className="block text-base font-semibold text-black">
                    Who can reply
                  </span>
                  <span className="block truncate text-sm font-medium text-gray-400">
                    Chose who can reply to this tweet
                  </span>
                </Dropdown.Header>
                <Dropdown.Item className="font-semibold">
                  Everyone
                </Dropdown.Item>
                <Dropdown.Item className="font-semibold">
                  People you follow
                </Dropdown.Item>
              </Dropdown>
            </div>
            <Button>Tweet</Button>
          </fieldset>
        </form>
      </div>
    </Card>
  );
}
