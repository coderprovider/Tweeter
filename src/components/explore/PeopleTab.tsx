import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api } from "../../utils/api";
import { Spinner } from "flowbite-react";
import Tweet from "../layout/Tweet";
import { getQueryKey } from "@trpc/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";

export default function PeopleTab() {
  const [parent] = useAutoAnimate();
  const queryClient = useQueryClient();

  return <ul ref={parent} className="space-y-7 py-4 md:col-span-3"></ul>;
}
