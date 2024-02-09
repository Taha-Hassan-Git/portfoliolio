"use client";
import { PreviewPortfolio } from "../_components/PreviewPortfolio";
import { usePortfolioPreview } from "../_store/store";

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex grow items-center justify-between overflow-scroll bg-gray-50">
      {children}
      <PreviewPortfolio portfolio={{ id: 0, sections: [] }} />
    </div>
  );
}
