import { SetStateAction } from "react";
import { RunStates } from "../_hooks/useAgent";

export function ChatForm({
  onSubmit,
  inputContent,
  setInputContent,
  error,
  runState,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputContent: string;
  setInputContent: (value: SetStateAction<string>) => void;
  error: string | null;
  runState: RunStates;
}) {
  return (
    <form
      className="flex flex-col w-full p-6 gap-4 items-center justify-center border-t-2"
      onSubmit={onSubmit}
    >
      <textarea
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        className="text-lg w-full h-fit min-h-[150px] rounded-lg border border-gray-500 p-2"
      />
      {error && <p>{error}</p>}
      <button // Only allow the user to submit messages when a run is complete
        disabled={runState.name !== "ready"}
        className="p-2 rounded-lg self-end border bg-blue-600 text-white"
        type="submit"
      >
        SUBMIT
      </button>
    </form>
  );
}
