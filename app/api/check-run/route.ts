import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

interface RunCheckPayload {
  thread: Thread;
  run: Run;
}

export const POST = async (req: Request): Promise<Response> => {
  const payload: RunCheckPayload = await req.json();
  const { thread, run } = payload;
  const status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  return new Response(JSON.stringify(status));
};
