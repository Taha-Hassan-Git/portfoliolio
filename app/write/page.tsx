"use client";
import Link from "next/link";
import { usePortfolio } from "../_store/store";

const WritePage = () => {
  const portfolio = usePortfolio();
  if (portfolio && portfolio.sections.length > 0)
    return (
      <div className="flex flex-col grow items-center justify-center bg-gray-50">
        <h1 className="text-xl font-bold">
          Choose a section to begin working on your portfolio
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col h-full gap-4 grow items-center justify-center bg-gray-50">
      <h2 className="text-xl">You don&apos;t have a portfolio skeleton yet</h2>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm">Work on your plan</p>
          <Link
            href={"/"}
            className="text-xl rounded w-fit py-1 px-2 border border-gray-300 bg-gray-100"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
