export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex grow items-center justify-between overflow-scroll bg-gray-50">
      {children}
    </div>
  );
}
