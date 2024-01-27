"use client";

import { usePathname } from "next/navigation";
import { useAgent } from "../../../_hooks/useAgent";
import { AiChat } from "../../../_components/AiChat";

const SectionPage = () => {
  const pathname = usePathname();
  const subSectionTitle = pathname.split("/")[3].replaceAll(/%20/g, " ");
  const {
    thread,
    messages,
    runState,
    onSubmit,
    inputContent,
    setInputContent,
    resetThread,
    error,
  } = useAgent("skeleton", "write:" + subSectionTitle);

  return (
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
        headingCopy="Let's get some info for this section."
      />
    </div>
  );
};

export default SectionPage;
