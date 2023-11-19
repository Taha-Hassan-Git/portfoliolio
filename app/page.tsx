"use client";

import { useEffect, useState } from "react";
import { SetAssistant, useLocalStorage } from "./hooks/useLocalStorage";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { createAssistant, getMessages, postMessage } from "./utils/openAi";
import { ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages.mjs";
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
  const [assistant, setAssistant] = useLocalStorage<{
    assistant: Assistant;
    thread: Thread;
  } | null>("assistant", null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedMessages: ChatGPTMessage[] = [
      ...messages,
      { role: "user", content: inputContent },
    ];

    setMessages(updatedMessages);
    setInputContent("");

    try {
      let currentAssistant = assistant;

      if (!currentAssistant) {
        currentAssistant = await createAssistant({ setAssistant });
      }

      if (currentAssistant) {
        await postMessage({
          updatedMessages,
          currentAssistant,
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
      if (runState.name === "running" && assistant) {
        console.log("Checking run");
        const response = await fetch("/api/check-run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            thread: assistant?.thread,
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
  }, [assistant, runState]);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-between gap-4 p-3">
      <div className="flex flex-col items-start p-4 gap-4 overflow-scroll">
        <button
          onClick={() => resetAssistant(setAssistant, setMessages)}
          className="self-start text-gray-800 text-sm rounded px-1 border bg-slate-100"
        >
          {assistant ? "Reset" : "No Assistant"}
        </button>
        <h1 className="p-10 text-xl self-center">
          Let&apos;s get some info for your Skeleton
        </h1>
        {messages.map((message, index) =>
          message.role === "user" ? (
            <UserMessage key={index} content={message.content} />
          ) : (
            <AssistantMessage key={index} content={message.content} />
          )
        )}
      </div>
      <form
        className="flex flex-col w-full p-10 gap-4 items-center justify-center"
        onSubmit={onSubmit}
      >
        <textarea
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          className="text-gray-50 text-lg w-full h-fit min-h-[150px] bg-gray-500 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {error && <p>{error}</p>}
        <button
          // Only allow the user to submit messages when a run is complete
          disabled={runState.name !== "ready"}
          className="bg-blue-900 p-2 rounded-lg self-end"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

const UserMessage = ({ content }: { content: string }) => (
  <div className="p-4 rounded-xl border shadow-sm border-gray-800 bg-slate-600 self-end max-w-[75%]">
    <p className="text-white">{content}</p>
  </div>
);

const AssistantMessage = ({ content }: { content: string }) => (
  <div className="p-4 rounded-xl border shadow-sm border-gray bg-slate-900 self-baseline max-w-[75%]">
    <p className="text-green-400 font-mono">{content}</p>
  </div>
);

const resetAssistant = (
  setAssistant: SetAssistant<{ assistant: Assistant; thread: Thread } | null>,
  setMessages: React.Dispatch<React.SetStateAction<ChatGPTMessage[]>>
) => {
  setAssistant(null);
  setMessages([]);
};
