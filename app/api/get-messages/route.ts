import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { threadId } from "worker_threads";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

export const POST = async (req: Request): Promise<Response> => {
  const payload = await req.json();
  const { data } = await openai.beta.threads.messages.list(payload.threadId);

  return new Response(JSON.stringify(data));
};
