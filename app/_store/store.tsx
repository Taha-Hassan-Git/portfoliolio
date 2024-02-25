"use client";
import { ReactNode, createContext, useContext } from "react";
import { usePersistReducer } from "../_hooks/usePersistReducer";

export type SubsectionType = {
  id: number;
  title: string;
  description: string;
  content: string;
  ksbs: string[];
};

export type SectionType = {
  id: number;
  title: string;
  description: string;
  subsection: SubsectionType[];
};
export type PortfolioType = { id: 0; sections: SectionType[] };

// Add an action to set the portfolio
type Action =
  | { type: "EDIT_SECTION_TITLE"; payload: SectionType }
  | { type: "EDIT_SECTION_DESCRIPTION"; payload: SectionType }
  | { type: "DELETE_SECTION"; payload: SectionType }
  | { type: "ADD_SECTION"; payload: SectionType }
  | { type: "EDIT_SUBSECTION_TITLE"; payload: SubsectionType }
  | { type: "EDIT_SUBSECTION_DESCRIPTION"; payload: SubsectionType }
  | { type: "EDIT_SUBSECTION_CONTENT"; payload: SectionType }
  | { type: "DELETE_SUBSECTION"; payload: SubsectionType }
  | { type: "ADD_SUBSECTION"; payload: SubsectionType }
  | { type: "SET_PORTFOLIO"; payload: PortfolioType };

export type ActionType = Action["type"];

export type ActionTypes = {
  type: string;
  payload: SectionType | SubsectionType | PortfolioType;
};
export type DispatchType = (value: Action) => void;

const PortfolioContext = createContext<PortfolioType>({
  id: 0,
  sections: [],
});

const PortfolioPreviewContext = createContext<PortfolioType>({
  id: 0,
  sections: [],
});

const PortfolioDispatchContext = createContext<DispatchType | null>(null);

const PreviewDispatchContext = createContext<DispatchType | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, dispatch] = usePersistReducer("portfolio");
  const [portfolioPreview, previewDispatch] =
    usePersistReducer("portfolioPreview");
  return (
    <PortfolioContext.Provider value={portfolio}>
      <PortfolioDispatchContext.Provider value={dispatch}>
        <PortfolioPreviewContext.Provider value={portfolioPreview}>
          <PreviewDispatchContext.Provider value={previewDispatch}>
            {children}
          </PreviewDispatchContext.Provider>
        </PortfolioPreviewContext.Provider>
      </PortfolioDispatchContext.Provider>
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const portfolio = useContext(PortfolioContext);
  if (portfolio) return portfolio;
  else throw new Error("usePortfolio must be used within a PortfolioProvider");
};

export const usePortfolioDispatch = () => {
  const dispatch = useContext(PortfolioDispatchContext);
  if (dispatch) return dispatch;
  else
    throw new Error(
      "usePortfolioDispatch must be used within a PortfolioProvider"
    );
};

export const usePortfolioPreview = () => {
  const portfolioPreview = useContext(PortfolioPreviewContext);
  if (portfolioPreview) return portfolioPreview;
  else
    throw new Error(
      "usePortfolioPreview must be used within a PortfolioProvider"
    );
};

export const usePreviewDispatch = () => {
  const previewDispatch = useContext(PreviewDispatchContext);
  if (previewDispatch) return previewDispatch;
  else
    throw new Error(
      "usePreviewDispatch must be used within a PortfolioProvider"
    );
};
