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
import { usePortfolioDispatch } from "./_store/store";
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
  const [inputContent, setInputContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [runState, setRunState] = useState<RunStates>({ name: "ready" });
  const [messages, setMessages] = useLocalStorage<ChatGPTMessage[]>(
    "messages",
    []
  );
  const [thread, setThread] = useLocalStorage<Thread | null>("thread", null);

  const assistantsArr = [
    { name: "skeleton", id: "asst_3aXwBiUZFqzcoSLUdGeFLGiG" },
  ];

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedMessages: ChatGPTMessage[] = [
      ...messages,
      { role: "user", content: inputContent },
    ];

    setMessages(updatedMessages);
    setInputContent("");

    try {
      let skeletonThread = thread;

      const skeletonAssistant = assistantsArr.find(
        (assistant) => assistant.name === "skeleton"
      );

      if (skeletonThread === null) {
        skeletonThread = await createThread();
        setThread(skeletonThread);
      }
      if (skeletonThread) {
        await postMessage({
          updatedMessages,
          skeletonAssistantId: skeletonAssistant?.id as string,
          skeletonThreadId: skeletonThread.id,
          setError,
          setRunState,
        });
      }
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const checkRun = async () => {
      if (runState.name === "running" && thread) {
        const response = await fetch("/api/check-run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            thread: thread,
            run: runState.run,
          }),
        });

        if (response.status !== 200) {
          const data = await response.json();
          setError("Error getting response: " + data.statusText);
          setTimeout(() => setError(""), 1000);
        } else {
          const run: Run = await response.json();
          if (run.status === "completed") {
            setRunState({ name: "ready" });
            const updatedMessages = await getMessages(run.thread_id);
            console.log(updatedMessages);
            const content = updatedMessages[0].content[0];

            if ("text" in content) {
              const aiResponse = content.text.value;
              setMessages([
                ...messages,
                { role: "assistant", content: aiResponse },
              ]);
              checkProject(aiResponse, dispatch);
            } else {
              console.log(
                "Error getting text value from response, it may have returned an image"
              );
            }
          }
          if (run.status === "requires_action") {
            console.log("call function");
            setRunState({ name: "error" });
          }
        }
      } else {
        clearInterval(interval);
      }
    };

    interval = setInterval(checkRun, 500);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, messages, runState, setMessages, thread]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-between bg-gray-50">
      <div className="flex flex-col items-start p-3 gap-3 overflow-scroll w-full ">
        <button
          onClick={() => resetThread(setThread, setMessages)}
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

const resetThread = (
  setThread: LocalStorageSetter<Thread | null>,
  setMessages: React.Dispatch<SetStateAction<ChatGPTMessage[]>>
) => {
  setThread(null);
  setMessages([]);
};

const checkProject = (aiResponse: string, dispatch: any) => {
  console.log("checkProject");
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
        payload: tripleQuoteObject.payload,
      });
    }
  }
};
