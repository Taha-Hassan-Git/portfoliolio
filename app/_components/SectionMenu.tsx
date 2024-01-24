"use client";
import { usePortfolio } from "../_store/store";

export const SectionMenu = () => {
  const portfolio = usePortfolio();
  return (
    <div className="flex flex-col h-screen w-[200px] items-center gap-4 bg-gray-50">
      {portfolio.sections.length > 0 && (
        <ul className="flex flex-col gap-1 ">
          {portfolio.sections.map((s) => (
            <li key={"sidebar" + s.id}>
              <div className="p-4 bg-gray-200 rounded-sm shadow-sm border">
                <h2>{s.title}</h2>
                <ul>
                  {s.subsection.map((subsection) => (
                    <li key={"sidebar" + subsection.id}>{subsection.title}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
