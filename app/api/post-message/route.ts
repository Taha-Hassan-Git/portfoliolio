import OpenAI from "openai";
import { ChatGPTMessage } from "../../_hooks/useAgent";

interface MessageRequestPayload {
  userMessage: ChatGPTMessage;
  assistant: { assistant: string; thread: string };
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

export const POST = async (req: Request): Promise<Response> => {
  const payload: MessageRequestPayload = await req.json();
  const response = await postMessage(payload);
  return new Response(JSON.stringify(response));
};

const postMessage = async (
  payload: MessageRequestPayload
): Promise<OpenAI.Beta.Threads.Runs.Run> => {
  const {
    userMessage,
    assistant: { assistant, thread },
  } = payload;

  await openai.beta.threads.messages.create(thread, {
    role: "user",
    content: `${userMessage.content}`,
  });
  const run = await openai.beta.threads.runs.create(thread, {
    assistant_id: assistant,
  });
  return run;
};
