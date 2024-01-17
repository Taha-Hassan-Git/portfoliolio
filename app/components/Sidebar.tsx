"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
export function Sidebar({}) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="w-[400px] h-screen border bg-gray-200 flex flex-col gap-3 p-2">
      <Link className="p-4 bg-gray-100 border shadow-sm" href="/">
        🤔 Plan
      </Link>
      <Link className="p-4 bg-gray-100 border shadow-sm" href="/write">
        📝 Write
      </Link>
      <Link className="p-4 bg-gray-100 border shadow-sm" href="/view">
        👀 View
      </Link>
    </div>
  );
}
