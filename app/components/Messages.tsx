import { ChatGPTMessage } from "../page";

export function Messages({ messages }: { messages: ChatGPTMessage[] }) {
  return (
    <div className="w-full flex flex-col">
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserMessage key={index} content={message.content} />
        ) : (
          <AssistantMessage key={index} content={message.content} />
        )
      )}
    </div>
  );
}

const UserMessage = ({ content }: { content: string }) => (
  <div className="p-4 rounded-xl border shadow-sm self-end max-w-[400px] bg-blue-100">
    <p className="">{content}</p>
  </div>
);

const AssistantMessage = ({ content }: { content: string }) => (
  <div className="p-4 rounded-xl border shadow-sm border-gray self-baseline max-w-[400px] bg-yellow-50">
    <p className=" font-mono">{content}</p>
  </div>
);
