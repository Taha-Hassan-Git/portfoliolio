"use client";
import { usePortfolioDispatch, usePortfolioPreview } from "../_store/store";
import { PreviewPortfolioEdit } from "./PreviewPortfolio";

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
      <div className="bg-gray-50 grow w-auto">
        <PreviewPortfolioEdit
          portfolio={{ id: 0, sections: portfolioPreview }}
          classNames="max-h-[80vh] overflow-scroll"
        />
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
