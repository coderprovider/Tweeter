import { Avatar, Button, Card, Spinner } from "flowbite-react";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { api, RouterOutputs } from "../../utils/api";
import useProfileFollow from "../../hooks/user/useProfileFollow";

interface UserBioProps {
  setToggleModal: Dispatch<SetStateAction<boolean>>;
  user: RouterOutputs["user"]["getUser"];
  userSession: Session;
}

export default function UserBio({
  setToggleModal,
  user,
  userSession,
}: UserBioProps) {
  const { mutate: followUser, isLoading: followLoading } = useProfileFollow({
    loggedInUserID: userSession.user.id,
  });

  function userFollow() {
    followUser({ followUserID: user.id });
  }

  return (
    <Card className="relative z-10 -mt-10">
      <section className="flex max-w-full gap-6">
        <Avatar
          img={
            user.image ||
            "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          }
          size="xl"
          className="-mt-16 hidden sm:block"
        />
        <article className="max-w-full flex-1">
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap items-center gap-x-5">
              <h5 className="text-xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
                {user.name}
              </h5>
              <p
                onClick={() => setToggleModal(true)}
                className="cursor-pointer text-sm font-semibold text-gray-500 dark:text-gray-400"
              >
                <span className="font-bold text-gray-600">
                  {user._count.following}{" "}
                </span>
                Following
              </p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-600">
                  {user.followedByIDs.length}{" "}
                </span>
                Followers
              </p>
            </div>
            {userSession &&
              userSession.user.id !== user.id &&
              (user.followedByIDs.includes(userSession.user.id) ? (
                <Button color="failure">Un Follow</Button>
              ) : (
                <Button
                  className={`text-center ${
                    followLoading
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  }`}
                  onClick={userFollow}
                >
                  {followLoading ? (
                    <Spinner aria-label="Default status example" size="md" />
                  ) : (
                    "Follow"
                  )}
                </Button>
              ))}
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
