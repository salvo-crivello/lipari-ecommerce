import { blackList } from "./blackList";

export const isDisposable = (email?: string) => {
  if (!email) return false;
  return blackList.includes(email.split("@")[1]);
};
