"use client";
import { SetStateAction, useEffect, useState } from "react";
import { LocalStorageSetter, useLocalStorage } from "./hooks/useLocalStorage";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { createThread, getMessages, postMessage } from "./utils/openAi";
import { Messages } from "./components/Messages";
export interface ChatGPTMessage {
  role: "assistant" | "user";
  content: string;
}

export type RunStates =
  | { name: "running"; run: Run }
  | { name: "ready" }
  | { name: "error" };

export default function Home() {
  const [inputContent, setInputContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [runState, setRunState] = useState<RunStates>({ name: "ready" });
  const [messages, setMessages] = useLocalStorage<ChatGPTMessage[]>(
    "messages",
    []
  );
  const [thread, setThread] = useLocalStorage<Thread | null>("thread", null);

  const assistantsArr = [
    { name: "skeleton", id: "asst_agngaCYdyNVFaIBOni99qbfA" },
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
        console.log("hi");
        console.log("Checking run");
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
          console.log(run.status);
          if (run.status === "completed") {
            console.log("Run completed");
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
  }, [messages, runState, setMessages]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-between gap-4 p-3 bg-gray-50">
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

        <Messages messages={messages} />
      </div>
      <form
        className="flex flex-col w-full p-10 gap-4 items-center justify-center"
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
