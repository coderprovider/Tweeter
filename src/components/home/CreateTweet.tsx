import { Dropdown, Spinner } from "flowbite-react";
import { Card, Button, Avatar, Textarea } from "flowbite-react";
import { BiImageAlt } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { api } from "../../utils/api";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function CreateTweet() {
  // ! create tweet mutation
  const { mutate, isLoading, error } = api.tweet.createTweet.useMutation({
    onSuccess: () => {
      setText("");
      setPhoto({ name: "", url: "" });
      toast.success("Created successfully😊");
    },
    onError: () => {
      toast.error("Server Error. Please try again later😓");
    },
  });

  // ! input state
  const [who, setWho] = useState<"FOLLOWER" | "PUBLIC">("PUBLIC");
  const [text, setText] = useState<string>("");
  const [photo, setPhoto] = useState({ name: "", url: "" });

  // ! image input reference
  const photoFileRef = useRef<HTMLInputElement | null>(null);

  if (error) {
    console.log(error);
  }

  // ! get temporary image url
  function handleImageChange(file: File | undefined) {
    if (file === undefined) return;
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPhoto({ name: file.name, url: result })
    );
  }

  // ! create the tweet
  function createTweet() {
    if (!text) return toast.error("Your tweet is empty");
    mutate({ text, authorized: who, image: photo.url });
  }

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
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            required={true}
            rows={2}
          />
          {photo.url && (
            <div className="relative h-72 w-full">
              <Image
                src={photo.url}
                alt="tweet cover"
                fill
                className="object-contain"
              />
            </div>
          )}
          <fieldset className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BiImageAlt
                onClick={() => photoFileRef.current?.click()}
                className="cursor-pointer text-2xl text-blue-500"
              />
              <input
                type="file"
                ref={photoFileRef}
                className="hidden"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files ? e.target.files[0] : undefined
                  )
                }
              />

              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <h4 className="flex cursor-pointer items-center gap-2 text-blue-500">
                    <BsGlobe className="text-xl" />
                    <span className="hidden text-base font-semibold sm:block">
                      {who == "FOLLOWER" ? "Follower" : "Public"}
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
                <Dropdown.Item
                  className="font-semibold capitalize"
                  onClick={() => setWho("PUBLIC")}
                >
                  public
                </Dropdown.Item>
                <Dropdown.Item
                  className="font-semibold capitalize"
                  onClick={() => setWho("FOLLOWER")}
                >
                  follower
                </Dropdown.Item>
              </Dropdown>
            </div>
            <Button
              onClick={createTweet}
              className={
                isLoading ? "pointer-events-none" : "pointer-events-auto"
              }
            >
              {isLoading ? (
                <>
                  <div className="mr-3">
                    <Spinner size="sm" light={true} />
                  </div>
                  Loading ...
                </>
              ) : (
                "Tweet"
              )}
            </Button>
          </fieldset>
        </form>
      </div>
    </Card>
  );
}
