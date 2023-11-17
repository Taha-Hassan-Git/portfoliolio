import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const POST = async (req: Request): Promise<Response> => {
  const assistant = await openai.beta.assistants.create({
    name: "Portfolio Assistant",
    instructions:
      "You are helping a software developer apprentice write a portfolio for their training programme, ask them questions about their job and projects they've worked on. Don't go into too much detail, you only need a basic overview of these. When you have a basic overview of their job and their work projects, call a function to end the conversation.",
    tools: [{ type: "function", function: functions[0] }],
    model: "gpt-4-1106-preview",
  });

  const thread = await openai.beta.threads.create();
  return new Response(JSON.stringify({ assistant, thread }));
};

const functions = [
  {
    name: "endConversation",
    description:
      "a function to call when you have enough information from the user",
    parameters: { type: "object", properties: {} },
  },
];
