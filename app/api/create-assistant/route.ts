import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}
const functions = [
  {
    name: "endConversation",
    description:
      "a function to call when you have enough information from the user",
    parameters: { type: "object", properties: {} },
  },
];

export const POST = async (req: Request): Promise<Response> => {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "Portfolio Assistant",
      instructions:
        "You are helping a software developer apprentice write a portfolio...",
      tools: [{ type: "function", function: functions[0] }],
      model: "gpt-4-1106-preview",
    });

    const thread = await openai.beta.threads.create();

    return new Response(JSON.stringify({ assistant, thread }));
  } catch (error) {
    console.error("Error in POST endpoint:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create assistant and thread" }),
      { status: 500 }
    );
  }
};
