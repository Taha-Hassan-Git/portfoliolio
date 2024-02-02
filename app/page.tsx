"use client";
import { PlanMenu } from "./_components/PlanMenu";
import { AiChat } from "./_components/AiChat";
import { usePortfolio } from "./_store/store";
import { useAgent } from "./_hooks/useAgent";
import { ExistingPortfolioPage } from "./_components/ExistingPortfolioPage";

export default function Home() {
  const portfolio = usePortfolio();
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
  if (portfolio && portfolio.sections.length > 0) {
    return (
      <div className="flex flex-col h-full grow items-center justify-around bg-gray-50 p-4">
        <ExistingPortfolioPage />
      </div>
    );
  }
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
