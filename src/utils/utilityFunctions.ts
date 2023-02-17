export function formatDate(myDate: Date) {
  const date = new Date(myDate);
  const options: { month: "long"; year: "numeric"; day: "numeric" } = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
