"use client";
import { SetStateAction, useEffect, useState } from "react";
import {
  LocalStorageSetter,
  useLocalStorage,
} from "./_hooks/useLocalStorageState";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { createThread, getMessages, postMessage } from "./utils/openAi";
import { Messages } from "./_components/Messages";
import { exampleSections, usePortfolioDispatch } from "./_store/store";
import { useAgent } from "./_hooks/useAgent";
export interface ChatGPTMessage {
  role: "assistant" | "user";
  content: string;
}

export type RunStates =
  | { name: "running"; run: Run }
  | { name: "ready" }
  | { name: "error" };

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
    <div className="flex flex-col h-screen w-full items-center justify-between bg-gray-50">
      <div className="flex flex-col items-start p-3 gap-3 overflow-scroll w-full ">
        <button
          onClick={() => resetThread()}
          className="text-sm rounded py-1 px-2 border border-gray-300 bg-gray-100"
        >
          {thread ? "Reset" : "No thread"}
        </button>
        {!thread && (
          <div className="self-center flex flex-col items-center">
            <h1 className="text-lg">
              Let&apos;s get some info for your Skeleton.
            </h1>
            <p>Say hi to begin chatting.</p>
          </div>
        )}

        <Messages messages={messages} runState={runState} />
      </div>
      <form
        className="flex flex-col w-full p-6 gap-4 items-center justify-center border-t-2"
        onSubmit={onSubmit}
      >
        <textarea
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          className="text-lg w-full h-fit min-h-[150px] rounded-lg border border-gray-500 p-2"
        />
        {error && <p>{error}</p>}
        <button
          // Only allow the user to submit messages when a run is complete
          disabled={runState.name !== "ready"}
          className="p-2 rounded-lg self-end border bg-blue-600 text-white"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
