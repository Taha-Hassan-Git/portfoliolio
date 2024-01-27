import React from "react";
import { ChatForm } from "./ChatForm";
import { MessagesSection } from "./MessagesSection";
import { Thread } from "openai/resources/beta/index.mjs";
import { ChatGPTMessage, RunStates } from "../_hooks/useAgent";
export function AiChat({
  thread,
  messages,
  runState,
  resetThread,
  onSubmit,
  inputContent,
  setInputContent,
  error,
  headingCopy,
}: {
  thread: Thread | null;
  messages: ChatGPTMessage[];
  runState: RunStates;
  resetThread: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputContent: string;
  setInputContent: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  headingCopy: string;
}) {
  return (
    <>
      <MessagesSection
        thread={thread}
        messages={messages}
        runState={runState}
        resetThread={resetThread}
        headingCopy={headingCopy}
      />
      <ChatForm
        runState={runState}
        onSubmit={onSubmit}
        inputContent={inputContent}
        setInputContent={setInputContent}
        error={error}
      />
    </>
  );
}
