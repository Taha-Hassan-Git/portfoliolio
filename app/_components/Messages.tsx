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
  //check if the string has ```json in it
  if (content.includes("```json")) {
    //if it does, we want to parse the json and display it as a json object
    const json = content.replace("```json", "").replace("```", "");
    return (
      <div className="flex flex-col p-4 rounded-xl border shadow-sm self-start max-w-[700px] max-h-[300px] bg-gray-200 relative">
        <button className="self-end absolute rounded py-1 px-2 border border-gray-300 bg-gray-100">
          Copy
        </button>
        <pre className="max-w-[700px] whitespace-pre-wrap  overflow-scroll">
          {JSON.stringify(JSON.parse(json), null, 2)}
        </pre>
      </div>
    );
  }
  return (
    <div className="p-4 rounded-xl border shadow-sm self-start max-w-[700px] bg-gray-50">
      <p>{content}</p>
    </div>
  );
};
