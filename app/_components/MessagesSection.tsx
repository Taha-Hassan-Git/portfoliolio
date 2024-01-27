import { Thread } from "openai/resources/beta/index.mjs";
import { ChatGPTMessage, RunStates } from "../_hooks/useAgent";
import { Messages } from "./Messages";

export function MessagesSection({
  thread,
  resetThread,
  messages,
  runState,
}: {
  thread: Thread | null;
  resetThread: () => void;
  messages: ChatGPTMessage[];
  runState: RunStates;
}) {
  return (
    <div className="flex flex-col items-start p-3 gap-3 overflow-scroll w-full ">
      <button
        onClick={() => resetThread()}
        className="text-sm rounded py-1 px-2 border border-gray-300 bg-gray-100"
      >
        {thread ? "Reset" : "No thread"}
      </button>
      {!thread && (
        <div className="self-center flex flex-col items-center">
          <h1 className="text-lg">
            Let&apos;s get some info for your Skeleton.
          </h1>
          <p>Say hi to begin chatting.</p>
        </div>
      )}

      <Messages messages={messages} runState={runState} />
    </div>
  );
}
