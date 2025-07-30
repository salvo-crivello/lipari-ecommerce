"use client";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconButton } from "./ui/Button";

const Breadcrumb = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLG } = useWindowSize();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const paths = segments.map(
    (_, i) => "/" + segments.slice(0, i + 1).join("/")
  );

  return (
    <motion.div
      initial={{ y: "0", opacity: 0 }}
      animate={{ y: "80px", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white text-sm px-5 lg:px-10 py-3 sm:border-b border-gray-200 absolute w-full left-0"
    >
      {isLG ? (
        <nav className="flex gap-2 items-center text-gray-600 max-w-7xl mx-auto">
          <Link
            href="/"
            className="hover:underline text-blue-500 cursor-pointer"
          >
            Home
          </Link>
          {segments.map((seg, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              {i === segments.length - 1 ? (
                <span className="text-gray-800 font-medium capitalize ">
                  {decodeURIComponent(seg)}
                </span>
              ) : (
                <Link
                  href={paths[i]}
                  className="hover:underline text-blue-500 capitalize cursor-pointer"
                >
                  {decodeURIComponent(seg)}
                </Link>
              )}
            </span>
          ))}
        </nav>
      ) : (
        <IconButton
          icon={ChevronLeft}
          variant={"inputButton"}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-500"
        />
      )}
    </motion.div>
  );
};

export default Breadcrumb;
