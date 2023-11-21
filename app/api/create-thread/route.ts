import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const POST = async (req: Request): Promise<Response> => {
  try {
    const thread = await openai.beta.threads.create();
    return new Response(JSON.stringify(thread));
  } catch (error) {
    console.error("Error in POST endpoint:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create assistant and thread" }),
      { status: 500 }
    );
  }
};
