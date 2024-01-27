"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function Sidebar({}) {
  const pathname = usePathname();
  const activeLink = (href: string) => {
    const activeStyle = "bg-gray-50 shadow-md ml-2 border-r-0";
    const inactiveStyle = "bg-gray-200 shadow-sm mx-2 border";

    if (href === "/" && pathname === "/") return activeStyle;
    else if (href !== "/" && pathname.startsWith(href)) return activeStyle;
    else return inactiveStyle;
  };

  return (
    <div className="w-[300px] h-screen bg-gray-100 flex flex-col gap-3 py-4">
      <Link className={"p-4 " + activeLink("/")} href="/">
        🤔 Plan
      </Link>
      <Link className={"p-4 " + activeLink("/write")} href="/write">
        📝 Write
      </Link>
      <Link className={"p-4 " + activeLink("/view")} href="/view">
        👀 View
      </Link>
    </div>
  );
}
