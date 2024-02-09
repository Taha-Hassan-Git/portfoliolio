"use client";
import { PreviewPortfolio } from "./PreviewPortfolio";
import React from "react";
import { usePortfolio, usePortfolioDispatch } from "../_store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ExistingPortfolioPage() {
  const dispatch = usePortfolioDispatch();
  const portfolio = usePortfolio();
  console.log(portfolio);
  const router = useRouter();
  const resetProject = () => {
    dispatch({ type: "SET_PORTFOLIO", payload: { id: 0, sections: [] } });
    router.push("/");
  };
  return (
    <>
      <div>
        <h1 className="text-xl text-bold">
          You have a portfolio skeleton already!
        </h1>
      </div>
      <PreviewPortfolio portfolio={portfolio} overlay />
      <div className="flex flex-col items-center gap-7">
        <p className="text-sm">
          Continue to keep working on it, or start a new portfolio skeleton
        </p>
        <div className="flex gap-4">
          <Link
            href={"/write"}
            className="text-xl rounded py-1 px-2 border border-gray-300 bg-gray-100"
          >
            Continue
          </Link>
          <button
            onClick={() => resetProject()}
            className="text-xl rounded py-1 px-2 border border-gray-300 bg-gray-100"
          >
            New Skeleton
          </button>
        </div>
      </div>
    </>
  );
}
