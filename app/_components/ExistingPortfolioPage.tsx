"use client";
import React from "react";
import { usePortfolio, usePortfolioDispatch } from "../_store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ExistingPortfolioPage() {
  const dispatch = usePortfolioDispatch();
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
      <PreviewPortfolio />
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

function PreviewPortfolio() {
  const portfolio = usePortfolio();
  return (
    <div className="relative border p-10 overflow-hidden max-h-[400px] flex flex-col gap-2">
      {portfolio.sections.map((section) => (
        <>
          <p className="text-xl" key={section.id + section.title + "preview"}>
            {section.title}
          </p>
          <ol>
            {section.subsection.map((subsection) => (
              <li
                className="ml-10 list-decimal"
                key={subsection.id + subsection.title + "preview"}
              >
                <p className="text-lg">{subsection.title}</p>
              </li>
            ))}
          </ol>
        </>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
