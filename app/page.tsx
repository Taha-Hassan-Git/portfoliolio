"use client";
import { PlanMenu } from "./_components/PlanMenu";
import { AiChat } from "./_components/AiChat";
import { useEffect } from "react";
import { exampleSections, usePortfolioDispatch } from "./_store/store";
import { useAgent } from "./_hooks/useAgent";

export default function Home() {
  const dispatch = usePortfolioDispatch();
  const {
    thread,
    messages,
    runState,
    onSubmit,
    inputContent,
    setInputContent,
    resetThread,
    error,
  } = useAgent("skeleton", "plan:");

  return (
    <>
      <div className="flex flex-col h-full grow items-center justify-between bg-gray-50">
        <AiChat
          thread={thread}
          messages={messages}
          runState={runState}
          resetThread={resetThread}
          onSubmit={onSubmit}
          inputContent={inputContent}
          setInputContent={setInputContent}
          error={error}
          headingCopy="Let's get started on your plan."
        />
      </div>
      <PlanMenu />
    </>
  );
}
