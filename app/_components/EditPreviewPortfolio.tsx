"use client";
import { usePortfolioPreview } from "../_store/store";
import { Section } from "./Section";

export function EditPreviewPortfolio({
  classNames = "",
}: {
  overlay?: boolean;
  classNames?: string;
}) {
  const portfolio = usePortfolioPreview();

  if (!portfolio.sections.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={
        "relative p-10 overflow-scroll flex flex-col gap-2 h-full w-full " +
        classNames
      }
    >
      {portfolio.sections.map((section) => (
        <Section
          key={section.id + section.title + "preview"}
          section={section}
        />
      ))}
    </div>
  );
}
