"use client";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import Cart from "@/src/templates/Cart";
import React from "react";
import Breadcrumb from "../BreadCrumb";
import CartHandler from "../CartHandler";
import LogoLipari from "../LogoLipari";
import ProfileHandler from "../ProfileHandler";
import DesktopMenu from "./menu/DesktopMenu";
import MobileMenu from "./menu/MobileMenu";

const Header = () => {
  const { isLG } = useWindowSize();

  return (
    <>
      <header className="fixed top-0 inset-x-0 px-5 lg:px-10 text-white py-5 bg-[url('/hero.webp')] bg-cover bg-top flex items-center z-[9999]">
        <LogoLipari />
        <nav className="flex items-center sm:gap-5 gap-2 w-full justify-end">
          {isLG && <DesktopMenu />}
          <ProfileHandler />
          <CartHandler />
          {!isLG && <MobileMenu />}
        </nav>
      </header>
      <Breadcrumb />
      <Cart />
    </>
  );
};

export default React.memo(Header);
