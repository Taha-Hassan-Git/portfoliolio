import { Assistant } from "next/font/google";
import { ChatGPTMessage, RunStates } from "../page";

export function Messages({
  messages,
  runState,
}: {
  messages: ChatGPTMessage[];
  runState: RunStates;
}) {
  return (
    <div className="w-full flex flex-col text-lg">
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserMessage key={index} content={message.content} />
        ) : (
          <AssistantMessage key={index} content={message.content} />
        )
      )}
      {runState.name === "running" && <AssistantMessage content={"..."} />}
    </div>
  );
}

const UserMessage = ({ content }: { content: string }) => (
  <div className="p-4 rounded-xl border shadow-sm self-end max-w-[400px] bg-cyan-50">
    <p className="">{content}</p>
  </div>
);

const AssistantMessage = ({ content }: { content: string }) => (
  <div className="p-4 rounded-xl border shadow-sm border-gray self-baseline max-w-[400px] bg-yellow-50">
    <p>{content}</p>
  </div>
);
