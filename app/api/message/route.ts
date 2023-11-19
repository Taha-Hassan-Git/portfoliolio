import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { ChatGPTMessage } from "../../page";

interface MessageRequestPayload {
  userMessage: ChatGPTMessage;
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
): Promise<OpenAI.Beta.Threads.Runs.Run> => {
  const {
    userMessage,
    assistant: { assistant, thread },
  } = payload;
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `${userMessage}`,
  });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });
  return run;
};
