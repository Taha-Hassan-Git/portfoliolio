export function Button(type = "secondary", styles: string) {
  return (
    <button
      className={`px-4 py-2 rounded-md ${styles} ${
        type === "primary"
          ? "bg-blue-500 text-white"
          : "bg-white text-black border border-black"
      }`}
    ></button>
  );
}
