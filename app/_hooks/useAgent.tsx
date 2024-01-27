import { Thread } from "openai/resources/beta/index.mjs";
import { Run } from "openai/resources/beta/threads/index.mjs";
import { useState, useEffect, SetStateAction } from "react";

import { createThread, getMessages, postMessage } from "../utils/openAi";
import { useLocalStorage } from "./useLocalStorageState";
import { usePortfolioDispatch } from "../_store/store";

export interface ChatGPTMessage {
  role: "assistant" | "user";
  content: string;
}

export type RunStates =
  | { name: "running"; run: Run }
  | { name: "ready" }
  | { name: "error" };

export function useAgent(agent: "skeleton", key: string) {
  const dispatch = usePortfolioDispatch();
  const [inputContent, setInputContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [runState, setRunState] = useState<RunStates>({ name: "ready" });
  const [messages, setMessages] = useLocalStorage<ChatGPTMessage[]>(
    key + "messages",
    []
  );
  const [thread, setThread] = useLocalStorage<Thread | null>(
    key + "thread",
    null
  );

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
      let currentThread = thread;

      const currentAssistant = assistantsArr.find(
        (assistant) => assistant.name === agent
      );

      if (currentThread === null) {
        currentThread = await createThread();
        setThread(currentThread);
      }
      if (currentThread) {
        postMessage({
          updatedMessages,
          currentAssistantId: currentAssistant?.id as string,
          currentThreadId: currentThread.id,
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

  const resetThread = () => {
    setThread(null);
    setMessages([]);
  };

  return {
    thread,
    messages,
    runState,
    onSubmit,
    inputContent,
    setInputContent,
    resetThread,
    error,
  };
}
