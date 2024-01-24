import { SectionMenu } from "../_components/SectionMenu";

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between overflow-scroll bg-gray-50">
      <SectionMenu />
      {children}
    </div>
  );
}
