import { usePortfolioPreviews } from "../_store/store";

export function PlanMenu() {
  const { portfolioPreviews } = usePortfolioPreviews();
  console.log(portfolioPreviews);
  return (
    <div className="w-[400px] flex flex-col gap-4 items-center bg-gray-100 border-l shadow-sm p-4 overflow-scroll">
      {portfolioPreviews.map((portfolio, index) => (
        <div className="bg-gray-50 w-[80%]" key={"preview" + index}>
          {portfolio.map((section) => (
            <p key={section.id}>{section.title}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
