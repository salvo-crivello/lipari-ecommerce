"use client";

import { navLinks } from "@/src/utils/data";
import clsx from "clsx";
import { Menu, XIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { IconButton } from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { toggleCart } from "@/src/store/sliceCart";

interface MenuProps {
  toggleMenu: () => void;
  isOpen: boolean;
}

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <IconButton
        icon={!isOpen ? Menu : XIcon}
        variant={"fill"}
        onClick={toggleMenu}
        className="ml-2"
      />
      <MenuSlide toggleMenu={toggleMenu} isOpen={isOpen} />
    </>
  );
};

export default MobileMenu;

export const MenuSlide = ({ toggleMenu, isOpen }: MenuProps) => {
  return (
    <>
      <motion.nav
        id="mobile-menu"
        aria-label="mobile-menu"
        className={clsx(
          "w-full fixed inset-0 h-screen -z-10 flex flex-col justify-between p-5 sm:p-10 pt-40",
          "bg-blue-950"
        )}
        initial={{ y: isOpen ? "0%" : "-100%" }}
        animate={isOpen ? { y: isOpen ? "0%" : "-100%" } : undefined}
        transition={{
          ease: [0.54, 0.01, 0, 1],
          duration: 0.8,
          delay: isOpen ? 0.2 : 0,
        }}
      >
        <MenuList toggleMenu={toggleMenu} isOpen={isOpen} />
      </motion.nav>

      <motion.div
        className={clsx("w-full fixed inset-0 h-screen -z-20", "bg-lime-400")}
        initial={{ y: isOpen ? "0%" : "-100%" }}
        animate={isOpen ? { y: isOpen ? "0%" : "-100%" } : undefined}
        transition={{
          ease: [0.54, 0.01, 0, 1],
          duration: 0.8,
          delay: isOpen ? 0 : 0.2,
        }}
      />
    </>
  );
};

const MenuList = ({ toggleMenu }: MenuProps) => {
  const pathname = usePathname();
  const { isOpen: cartIsOpen } = useSelector(
    (state: RootState) => state.cartData
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    toggleMenu();
    if (cartIsOpen) {
      dispatch(toggleCart());
    }
  };

  return (
    <ul className="flex gap-10  w-full flex-col mt-40 ">
      {navLinks.map((page) => (
        <li
          key={page.id}
          className="group border-b-4 border-white/5"
          onClick={handleClick}
        >
          <Link
            href={page.path}
            aria-label={`Navigate to ${page.name}`}
            className={clsx("text-2xl", {
              " text-white group-hover:text-lime-500": pathname !== page.path,
              " text-lime-500 pointer-events-none": pathname === page.path,
            })}
          >
            {page.name}
          </Link>
          <div
            className={clsx(
              "h-1 w-0 transition-all duration-150 ease-in-out mt-2",
              {
                " bg-white group-hover:w-full group-hover:bg-lime-500":
                  pathname !== page.path,
              }
            )}
          />
        </li>
      ))}
    </ul>
  );
};
