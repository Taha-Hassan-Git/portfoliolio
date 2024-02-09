"use client";
import { EditPreviewPortfolio } from "../_components/EditPreviewPortfolio";
import { usePortfolioPreview } from "../_store/store";

const PreviewPage = () => {
  const { portfolioPreview } = usePortfolioPreview();
  return (
    <EditPreviewPortfolio portfolio={{ id: 0, sections: portfolioPreview }} />
  );
};

export default PreviewPage;
