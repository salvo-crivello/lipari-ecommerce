"use client";
import { navLinks } from "@/src/utils/data";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-5 w-full justify-end mr-5">
      {navLinks.map((page) => (
        <li key={page.id} className="group">
          <Link
            href={page.path}
            aria-label={`Navigate to ${page.name}`}
            aria-disabled={pathname === page.path}
            className={clsx(
              " font-mono uppercase transition-all duration-150 leading-0",
              {
                " text-white group-hover:text-blue-900": pathname !== page.path,
                " text-blue-900 pointer-events-none": pathname === page.path,
              }
            )}
          >
            {page.name}
          </Link>
          <div
            className={clsx(
              "h-1 w-0 group-hover:w-full transition-all duration-150 ease-in-out",
              {
                " bg-white group-hover:w-full group-hover:bg-blue-900":
                  pathname !== page.path,
              }
            )}
          />
        </li>
      ))}
    </ul>
  );
};

export default DesktopMenu;
