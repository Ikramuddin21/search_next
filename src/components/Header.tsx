"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Watchlist", path: "/watchlist" },
  ];
  return (
    <header className="text-center w-full h-[70px] bg-cyan-900 flex items-center justify-center">
      <ul className="list-none flex items-center gap-6">
        {navItems?.map((item, index: number) => (
          <li key={index}>
            <Link
              className={`text-[17px] text-semibold text-white border-b-[3px] hover:border-b-rose-500 duration-500 ${
                pathname === item.path
                  ? "border-b-rose-500"
                  : "border-transparent"
              }`}
              href={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
