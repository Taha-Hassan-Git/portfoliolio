import { usePortfolioDispatch, usePortfolioPreview } from "../_store/store";
import { PreviewPortfolio } from "./PreviewPortfolio";

export function PlanMenu() {
  const { portfolioPreview } = usePortfolioPreview();
  const dispatch = usePortfolioDispatch();

  const setPortfolio = () => {
    dispatch({
      type: "SET_PORTFOLIO",
      payload: { id: 0, sections: portfolioPreview },
    });
  };
  return (
    <div className="w-[400px] flex flex-col gap-4 items-center bg-gray-100 border-l shadow-sm p-4 overflow-scroll">
      <div className="bg-gray-50 w-auto">
        <PreviewPortfolio
          portfolio={{ id: 0, sections: portfolioPreview }}
          classNames="max-h-[80vh] overflow-scroll"
        />
        {/* {portfolioPreview.map((section, index) => (
          <ol key={"preview:" + section.id + section.title}>
            <li>
              <ol>
                <p>{section.title}</p>
                {section.subsection.map((subsection, index) => (
                  <li key={"preview:" + subsection.id + subsection.title}>
                    <p>{subsection.title}</p>
                  </li>
                ))}
              </ol>
            </li>
          </ol>
        ))} */}
      </div>
      <button
        onClick={() => setPortfolio()}
        className="rounded py-1 px-2 border border-gray-300 bg-gray-100"
      >
        Set Portfolio
      </button>
    </div>
  );
}
