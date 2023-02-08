import { Avatar, Button, Card } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

interface UserBioProps {
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}

export default function UserBio({ setToggleModal }: UserBioProps) {
  return (
    <Card className="relative z-10 -mt-10">
      <section className="flex max-w-full gap-6">
        <Avatar
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          size="xl"
          className="-mt-16 hidden sm:block"
        />
        <article className="max-w-full flex-1">
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap items-center gap-x-5">
              <h5 className="text-xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
                Daniel Jensen
              </h5>
              <p
                onClick={() => setToggleModal(true)}
                className="cursor-pointer text-sm font-semibold text-gray-500 dark:text-gray-400"
              >
                <span className="font-bold text-gray-600">2,569 </span>
                Following
              </p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-600">10.8k </span>
                Followers
              </p>
            </div>
            <Button>Follow</Button>
          </div>

          <p className="mt-2 w-96 max-w-full font-medium text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
            minima!
          </p>
        </article>
      </section>
    </Card>
  );
}
