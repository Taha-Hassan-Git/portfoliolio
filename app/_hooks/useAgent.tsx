import { Thread } from "openai/resources/beta/index.mjs";
import { Run } from "openai/resources/beta/threads/index.mjs";
import { useState, useEffect, SetStateAction } from "react";
import { RunStates, ChatGPTMessage } from "../page";
import { createThread, getMessages } from "../utils/openAi";
import { LocalStorageSetter, useLocalStorage } from "./useLocalStorageState";
import { exampleSections, usePortfolioDispatch } from "../_store/store";

export function useAgent(agent: "skeleton") {
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

const checkProject = (aiResponse: string, dispatch: any) => {
  dispatch({
    type: "SET_PORTFOLIO",
    payload: { id: 0, sections: exampleSections },
  });
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
