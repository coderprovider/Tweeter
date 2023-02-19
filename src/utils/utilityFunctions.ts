import { TRPCError } from "@trpc/server";

export function formatDate(myDate: Date) {
  const date = new Date(myDate);
  const options: { month: "long"; year: "numeric"; day: "numeric" } = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatError(err: any) {
  const formattedError: TRPCError = {
    name: "TRPCError",
    code: "INTERNAL_SERVER_ERROR",
    message:
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString(),
    cause: err,
  };
  return formattedError;
}
