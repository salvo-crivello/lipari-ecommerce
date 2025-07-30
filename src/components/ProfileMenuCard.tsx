import clsx from "clsx";
import { CircleUserRound, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, memo, SetStateAction, useRef } from "react";
import { User } from "../contexts/AuthProvider";
import useOutClickHandle from "../hooks/useOutClickHandle";
import { navLinksUser } from "../utils/data";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Icon from "./ui/Icon";

type ProfileMenuCardProps = {
  user: User;
  logout: () => Promise<void>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function ProfileMenuCard({ user, logout, setIsOpen }: ProfileMenuCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push("/");
  };

  useOutClickHandle(cardRef, () => setIsOpen(false));

  return (
    <Card
      ref={cardRef}
      className="w-[300px] max-w-sm absolute right-0 top-[120%] bg-white shadow-lg shadow-neutral-200"
    >
      <CardHeader className="flex flex-col items-center">
        <Image
          width={40}
          height={40}
          className="rounded-full h-12 w-12 mx-auto mb-5 shadow p-2"
          alt="User Profile"
          src={user.image}
        />
        <p className="uppercase text-blue-950 font-semibold">{user.username}</p>
        <p className="text-xs text-blue-700 font-normal mb-2">{user.role}</p>
        <p className="text-xs text-neutral-500 font-normal">{user.email}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {navLinksUser.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            onClick={() => {
              setIsOpen(false);
            }}
            className={clsx(
              "px-4 py-2 cursor-pointer bg-neutral-100 hover:bg-blue-100 text-black rounded-md"
            )}
          >
            <Icon
              Icon={link.icon || CircleUserRound}
              className="inline-block mr-2"
              size={"1.2em"}
            />
            {link.name}
          </Link>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-2 border-t-2 border-neutral-50 pt-2">
        <button
          className={clsx(
            "w-full px-4 py-2 cursor-pointer bg-transparent hover:bg-blue-100 text-black rounded-md text-left"
          )}
          onClick={handleLogout}
        >
          <Icon
            Icon={LogOutIcon}
            className="inline-block mr-2"
            size={"1.2em"}
          />
          logout
        </button>
      </CardFooter>
    </Card>
  );
}

export default memo(ProfileMenuCard);
