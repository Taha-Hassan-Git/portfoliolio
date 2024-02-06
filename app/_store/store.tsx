"use client";

import { ReactNode, createContext, useContext, useReducer } from "react";

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
  const [portfolio, dispatch] = useReducer(portfolioReducer, {
    id: 0,
    sections: [],
  });
  const [portfolioPreview, previewDispatch] = useReducer(portfolioReducer, {
    id: 0,
    sections: [],
  });
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

export const portfolioReducer = (
  portfolio: PortfolioType,
  action: ActionTypes
): PortfolioType => {
  switch (action.type) {
    case "EDIT_SECTION_TITLE": {
      const sections = portfolio.sections.map((section: SectionType) => {
        if (section.id === action.payload.id) {
          const actionPayload = action.payload as SectionType;
          console.log(actionPayload);
          return {
            ...section,
            title: actionPayload.title,
          };
        }
        return section;
      });
      return { id: 0, sections: [...sections] };
    }

    case "EDIT_SECTION_DESCRIPTION": {
      const sections = portfolio.sections.map((section) => {
        if (section.id === action.payload.id) {
          const actionPayload = action.payload as SectionType;
          return {
            ...section,
            description: actionPayload.description,
          };
        }
        return section;
      });
      return { id: 0, sections: [...sections] };
    }

    case "DELETE_SECTION": {
      const sections = portfolio.sections.filter(
        (section: SectionType) => section.id !== action.payload.id
      );

      return { id: 0, sections: [...sections] };
    }

    case "ADD_SECTION": {
      const payload = action.payload as SectionType;
      const sections = [...portfolio.sections, payload];
      return { id: 0, sections: [...sections] };
    }

    case "EDIT_SUBSECTION_TITLE": {
      const sections = portfolio.sections.map((section: SectionType) => {
        const issuePayload = action.payload as SubsectionType;
        if (section.id === issuePayload.id) {
          return {
            ...section,
            issues: section.subsection.map((issue: SubsectionType) => {
              if (issue.id === issuePayload.id) {
                return {
                  ...issue,
                  title: issuePayload.title,
                };
              }
              return issue;
            }),
          };
        }
        return section;
      });
      return { id: 0, sections: [...sections] };
    }

    case "EDIT_SUBSECTION_DESCRIPTION": {
      const sections = portfolio.sections.map((section: SectionType) => {
        const issuePayload = action.payload as SubsectionType;
        if (section.id === issuePayload.id) {
          return {
            ...section,
            issues: section.subsection.map((issue: SubsectionType) => {
              if (issue.id === issuePayload.id) {
                return {
                  ...issue,
                  description: issuePayload.description,
                };
              }
              return issue;
            }),
          };
        }
        return section;
      });
      return { id: 0, sections: [...sections] };
    }

    case "DELETE_SUBSECTION": {
      const sections = portfolio.sections.map((section: SectionType) => {
        return {
          ...section,
          issues: section.subsection.filter(
            (issue: SubsectionType) => issue.id !== action.payload.id
          ),
        };
      });

      return { id: 0, sections: [...sections] };
    }
    case "ADD_SUBSECTION": {
      const sections = portfolio.sections.map((section: SectionType) => {
        if (section.id === action.payload.id) {
          const actionPayload = action.payload as SectionType;
          return {
            ...section,
            issues: [...section.subsection, ...actionPayload.subsection],
          };
        }
        return section;
      });
      return { id: 0, sections: [...sections] };
    }
    case "SET_PORTFOLIO": {
      const payload = action.payload as PortfolioType;
      return payload;
    }

    default: {
      return portfolio;
    }
  }
};
