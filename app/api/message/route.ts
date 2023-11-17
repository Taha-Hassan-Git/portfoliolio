import OpenAI from "openai";
import { ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages.mjs";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const POST = async (req: Request): Promise<Response> => {
  const message = await req.json();
  const response = await interviewAgent(message);
  return new Response(JSON.stringify(response));
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

export const interviewAgent = async (
  payLoad: string
): Promise<ThreadMessagesPage> => {
  const { thread, assistant, inputContent } = JSON.parse(payLoad);

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `${inputContent}`,
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  const newMessages = await openai.beta.threads.messages.list(thread.id);
  return newMessages;
};
