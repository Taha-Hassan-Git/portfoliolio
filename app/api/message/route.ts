import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { ChatGPTMessage } from "../../page";

interface MessageRequestPayload {
  messages: ChatGPTMessage[];
  assistant: { assistant: Assistant; thread: Thread };
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

export const POST = async (req: Request): Promise<Response> => {
  const payload: MessageRequestPayload = await req.json();
  const response = await interviewAgent(payload);
  return new Response(JSON.stringify(response));
};

export const interviewAgent = async (
  payload: MessageRequestPayload
): Promise<ThreadMessagesPage> => {
  const {
    messages,
    assistant: { assistant, thread },
  } = payload;

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `${messages[messages.length - 1]}`,
  });
  console.log({ message });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  const newMessages = await openai.beta.threads.messages.list(thread.id);
  return newMessages;
};
