import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { ChatGPTMessage, RunStates } from "../page";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";

export async function postMessage({
  updatedMessages,
  skeletonAssistantId,
  skeletonThreadId,
  setError,
  setRunState,
}: {
  updatedMessages: ChatGPTMessage[];
  skeletonAssistantId: string;
  skeletonThreadId: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setRunState: React.Dispatch<React.SetStateAction<RunStates>>;
}) {
  const userMessages = updatedMessages.filter(
    (message) => message.role === "user"
  );

  const latestUserMessage = userMessages[userMessages.length - 1];
  const response = await fetch("/api/post-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userMessage: latestUserMessage,
      assistant: {
        assistant: skeletonAssistantId,
        thread: skeletonThreadId,
      },
    }),
  });

  if (response.status !== 200) {
    const data = await response.json();
    setError("Error getting response: " + data.statusText);
    setTimeout(() => setError(""), 500);
  } else {
    const run = await response.json();
    setRunState({ name: "running", run });
  }
}

export async function createThread() {
  const response = await fetch("/api/create-thread", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
  });

  if (response.status === 200) {
    const data = await response.json();

    return data;
  } else {
    throw new Error("Failed to create assistant");
  }
}

export async function getMessages(threadId: string) {
  const response = await fetch("/api/get-messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ threadId }),
  });
  if (response.status === 200) {
    const data: ThreadMessage[] = await response.json();
    return data;
  } else {
    throw new Error("Failed to get messages");
  }
}
