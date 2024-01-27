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

  useEffect(() => {
    const checkProject = (aiResponse: string, dispatch: any) => {
      //check if the message has triple quotes """message"""
      const tripleQuoteRegex = /"""(.*?)"""/;
      const tripleQuoteMatches = aiResponse.match(tripleQuoteRegex);
      if (tripleQuoteMatches) {
        console.log("contains triple brackets");
        //get the text inside the triple brackets
        const tripleQuoteText = tripleQuoteMatches[0].replace(
          tripleQuoteRegex,
          "$1"
        );
        //check if the text is a valid object
        const tripleQuoteObject = JSON.parse(tripleQuoteText);
        // if it is, dispatch the action
        if (tripleQuoteObject) {
          dispatch({
            type: "SET_PORTFOLIO",
            payload: { id: 0, sections: exampleSections },
          });
        }
      }
    };
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        checkProject(lastMessage.content, dispatch);
      }
    }
  }, [dispatch, messages]);

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
