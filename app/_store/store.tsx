"use client";

import { ReactNode, createContext, useContext, useReducer } from "react";
import { useLocalStoragePortfolio } from "../_hooks/useLocalStoragePortfolio";

export type SubsectionType = {
  id: number;
  title: string;
  description: string;
  content: string;
};

export type SectionType = {
  id: number;
  title: string;
  description: string;
  subsection: SubsectionType[];
};
export type PortfolioType = { id: 0; sections: SectionType[] };
export type portfolioPreviewType = {
  portfolioPreview: SectionType[];
  previewDispatch: DispatchType | null;
};

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
export type ActionTypes = {
  type: string;
  payload: SectionType | SubsectionType | PortfolioType;
};
export type DispatchType = (value: Action) => void;

const PortfolioContext = createContext<PortfolioType>({
  id: 0,
  sections: [],
});
const portfolioPreviewContext = createContext<portfolioPreviewType>({
  portfolioPreview: [],
  previewDispatch: null,
});
const PortfolioDispatchContext = createContext<DispatchType | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, dispatch] = useLocalStoragePortfolio("portfolio", {
    id: 0,
    sections: [],
  });
  const [portfolioPreview, previewDispatch] = useLocalStoragePortfolio(
    "portfolioPreview",
    {
      id: 0,
      sections: [],
    }
  );
  return (
    <PortfolioContext.Provider value={portfolio}>
      <PortfolioDispatchContext.Provider value={dispatch}>
        <portfolioPreviewContext.Provider
          value={{
            portfolioPreview: [...portfolioPreview.sections],
            previewDispatch,
          }}
        >
          {children}
        </portfolioPreviewContext.Provider>
      </PortfolioDispatchContext.Provider>
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  return useContext(PortfolioContext);
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
  const portfolioPreview = useContext(portfolioPreviewContext);
  if (portfolioPreview) return portfolioPreview;
  else
    throw new Error(
      "usePortfolioPreview must be used within a PortfolioProvider"
    );
};
