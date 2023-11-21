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
      instructions: `You are helping a software developer apprentice write a portfolio for their training programme, ask them questions about their job and projects they've worked on. Don't go into too much detail, you only need a basic overview of these. When you have a basic overview of their job and their work projects, say goodbye and end the conversation.`,
      name: "KSB Assistant",
      model: "gpt-4-1106-preview",
      tools: [{ type: "function", function: functions[0] }],
    });

    return new Response(JSON.stringify(assistant));
  } catch (error) {
    console.error("Error in POST endpoint:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create assistant and thread" }),
      { status: 500 }
    );
  }
};
