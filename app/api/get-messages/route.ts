import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

export const POST = async (req: Request): Promise<Response> => {
  const payload = await req.json();
  const { data } = await openai.beta.threads.messages.list(payload.threadId);

  return new Response(JSON.stringify(data));
};
