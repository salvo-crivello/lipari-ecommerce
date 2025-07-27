"use client";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import {
  CircleUserRound,
  ShoppingCart,
  Settings,
  LogOutIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button, IconButton, LinkButton } from "../Button";
import DesktopMenu from "./menu/DesktopMenu";
import MobileMenu from "./menu/MobileMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";

const Header = () => {
  const { token, user, login, logout } = useAuth();
  const pathname = usePathname();
  const { isLG } = useWindowSize();

  return (
    <header className="fixed top-0 inset-x-0 px-5 lg:px-10 text-white py-5 bg-[url('/hero.webp')] bg-auto bg-top flex items-center">
      <Image
        src={"/logo.png"}
        alt="logo lipari consulting"
        width={100}
        height={100}
        className="w-10 h-10 object-cover"
      />
      <nav className="flex items-center sm:gap-5 gap-2 w-full justify-end">
        {isLG && <DesktopMenu />}
        <HeaderUserProfile />
        <IconButton icon={ShoppingCart} />
        {!isLG && <MobileMenu />}
      </nav>
      {/* {!token ? (
        <button
          onClick={() => login(dummyLoginData)}
          className="bg-lime-400 rounded-full px-5 py-2 text-black hover:bg-lime-500 transition-colors"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => logout()}
          className="bg-lime-400 rounded-full px-5 py-2 text-black hover:bg-lime-500 transition-colors"
        >
          Logout
        </button>
      )} */}
    </header>
  );
};

export default React.memo(Header);

export const HeaderUserProfile = () => {
  const { user } = useAuth();
  const { isLG } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push("/");
  };

  return (
    <>
      {user ? (
        <div className="relative overflow-visible">
          <Button
            className="uppercase font-mono justify-self-end"
            size={"small"}
            variant="secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              width={40}
              height={40}
              className="rounded-full h-[1.2em] w-[1.2em]"
              alt="User Profile"
              src={user.image}
            />
            {user.username}
          </Button>
          {isOpen && (
            <Card className="w-[300px] max-w-sm absolute right-0 top-[120%]">
              <CardHeader>
                <CardTitle className="flex flex-col">
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full h-12 w-12 mx-auto mb-5 shadow p-2"
                    alt="User Profile"
                    src={user.image}
                  />
                  <p className="mx-auto uppercase mb-2">{user.username}</p>
                  <p className="mx-auto text-xs text-neutral-500 font-normal">
                    {user.email}
                  </p>
                </CardTitle>
                {/* <CardDescription className="text-sm text-pretty leading-snug">
                  Inserisci username e password per accedere al tuo account.
                </CardDescription> */}
              </CardHeader>
              <CardContent className="border-t-2 border-neutral-200/50 pt-5">
                <LinkButton
                  href="/profile"
                  variant="tertiary"
                  rounded="default"
                  icon={CircleUserRound}
                  className="w-full text-neutral-700 mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Profilo
                </LinkButton>
                <LinkButton
                  href=""
                  variant="tertiary"
                  rounded="default"
                  icon={Settings}
                  className="w-full text-neutral-700"
                  onClick={() => setIsOpen(false)}
                >
                  Impostazioni
                </LinkButton>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  variant="text"
                  icon={LogOutIcon}
                  rounded="default"
                  className="w-full text-neutral-700"
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      ) : !isLG ? (
        <IconButton icon={CircleUserRound} />
      ) : (
        <LinkButton
          href="/login"
          icon={CircleUserRound}
          className="uppercase font-mono"
        >
          Login/Signup
        </LinkButton>
      )}
    </>
  );
};
