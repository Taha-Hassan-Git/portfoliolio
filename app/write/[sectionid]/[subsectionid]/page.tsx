"use client";

import { usePathname } from "next/navigation";
import { Messages } from "../../../_components/Messages";
import { useAgent } from "../../../_hooks/useAgent";

const SectionPage = () => {
  const pathname = usePathname();
  const subSectionTitle = pathname.split("/")[3].replaceAll(/%20/g, " ");
  const {
    thread,
    messages,
    runState,
    onSubmit,
    inputContent,
    setInputContent,
    resetThread,
    error,
  } = useAgent("skeleton", "write:" + subSectionTitle);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-between bg-gray-50">
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
              Let&apos;s get some info for this section.
            </h1>
            <p>Say hi to begin chatting.</p>
          </div>
        )}

        <Messages messages={messages} runState={runState} />
      </div>
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
        <button
          // Only allow the user to submit messages when a run is complete
          disabled={runState.name !== "ready"}
          className="p-2 rounded-lg self-end border bg-blue-600 text-white"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SectionPage;
