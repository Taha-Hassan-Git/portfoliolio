import { ChatGPTMessage, RunStates } from "../_hooks/useAgent";

export function Messages({
  messages,
  runState,
}: {
  messages: ChatGPTMessage[];
  runState: RunStates;
}) {
  return (
    <div className="w-full flex flex-col gap-4 text-lg">
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

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="p-4 rounded-xl border shadow-sm self-end max-w-[700px] bg-gray-100">
      <p className="">{content}</p>
    </div>
  );
};

const AssistantMessage = ({ content }: { content: string }) => {
  console.log({ content });
  // find and remove section between triple backticks ```message``` in content
  function extractSubstring(str: string) {
    // Regular expression for finding a substring between triple backticks
    const regex = /```(.*?)```/;

    // Using the regex to match the string
    const match = str.match(regex);

    // Return the captured group if a match is found, otherwise return an empty string
    return match ? match[1] : "";
  }

  // Example usage
  const result = extractSubstring(content);
  console.log(result);
  return (
    <div className="p-4 rounded-xl border shadow-sm self-start max-w-[700px] bg-gray-50">
      <p>{content}</p>
    </div>
  );
};
