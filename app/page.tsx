"use client";

import { useState } from "react";
import { SetAssistant, useLocalStorage } from "./hooks/useLocalStorage";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
export interface ChatGPTMessage {
  role: "assistant" | "user";
  content: string;
}

export default function Home() {
  const [inputContent, setInputContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useLocalStorage<ChatGPTMessage[]>(
    "messages",
    [
      {
        role: "assistant",
        content:
          "Hello, so I hear you're working on a software development apprenticeship, tell me a bit about the company you work for.",
      },
    ]
  );
  const [assistant, setAssistant] = useLocalStorage<{
    assistant: Assistant;
    thread: Thread;
  } | null>("assistant", null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessages((messages) => [
      ...messages,
      { role: "user", content: inputContent },
    ]);
    setInputContent("");

    try {
      let currentAssistant = assistant;

      if (!currentAssistant) {
        currentAssistant = await createAssistant({
          messages,
          setError,
          setAssistant,
        });
      }

      if (currentAssistant) {
        const response = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
            assistant: {
              assistant: currentAssistant.assistant,
              thread: currentAssistant.thread,
            },
          }),
        });

        if (response.status !== 200) {
          const data = await response.json();
          setError("Error getting response: " + data.statusText);
          setTimeout(() => setError(""), 500);
        } else {
          const data = await response.json();
          console.log("Message response: ", { data });
        }
      }
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

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
        <button className="bg-blue-900 p-2 rounded-lg self-end" type="submit">
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
  setMessages([
    {
      role: "assistant",
      content:
        "Hello, so I hear you're working on a software development apprenticeship, tell me a bit about the company you work for.",
    },
  ]);
};

async function createAssistant({
  messages,
  setAssistant,
}: {
  messages: ChatGPTMessage[];
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setAssistant: SetAssistant<{ assistant: Assistant; thread: Thread } | null>;
}) {
  const response = await fetch("/api/create-assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (response.status === 200) {
    const data = await response.json();
    setAssistant({ assistant: data.assistant, thread: data.thread });
    return { assistant: data.assistant, thread: data.thread };
  } else {
    throw new Error("Failed to create assistant");
  }
}
