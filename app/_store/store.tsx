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
export type PortfolioType = SectionType[];

type Action =
  | { type: "EDIT_SECTION_TITLE"; payload: SectionType }
  | { type: "EDIT_SECTION_DESCRIPTION"; payload: SectionType }
  | { type: "EDIT_SUBSECTION_TITLE"; payload: SubsectionType }
  | { type: "EDIT_SUBSECTION_DESCRIPTION"; payload: SubsectionType }
  | { type: "DELETE_SECTION"; payload: SectionType }
  | { type: "DELETE_SUBSECTION"; payload: SubsectionType };
export type ActionTypes = {
  type: string;
  payload: SectionType | SubsectionType;
};
export type DispatchType = (value: Action) => void;

const PortfolioContext = createContext({});
const PortfolioDispatchContext = createContext<DispatchType | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, dispatch] = useReducer(portfolioReducer, []);
  return (
    <PortfolioContext.Provider value={portfolio}>
      <PortfolioDispatchContext.Provider value={dispatch}>
        {children}
      </PortfolioDispatchContext.Provider>
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};

export const usePortfolioDispatch = () => {
  return useContext(PortfolioDispatchContext);
};

export const portfolioReducer = (
  portfolio: PortfolioType,
  action: ActionTypes
): PortfolioType => {
  switch (action.type) {
    case "EDIT_SECTION_TITLE": {
      const sections = portfolio.map((section: SectionType) => {
        if (section.id === action.payload.id) {
          const actionPayload = action.payload as SectionType;
          return {
            ...section,
            title: actionPayload.title,
          };
        }
        return section;
      });
      return [...sections];
    }

    case "EDIT_SECTION_DESCRIPTION": {
      const sections = portfolio.map((section) => {
        if (section.id === action.payload.id) {
          const actionPayload = action.payload as SectionType;
          return {
            ...section,
            description: actionPayload.description,
          };
        }
        return section;
      });
      return [...sections];
    }

    case "EDIT_SUBSECTION_TITLE": {
      const sections = portfolio.map((section: SectionType) => {
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
      return [...sections];
    }

    case "EDIT_SUBSECTION_DESCRIPTION": {
      const sections = portfolio.map((section: SectionType) => {
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
      return [...sections];
    }

    case "DELETE_SECTION": {
      const sections = portfolio.filter(
        (section: SectionType) => section.id !== action.payload.id
      );

      return [...sections];
    }

    case "DELETE_SUBSECTION": {
      const sections = portfolio.map((section: SectionType) => {
        return {
          ...section,
          issues: section.subsection.filter(
            (issue: SubsectionType) => issue.id !== action.payload.id
          ),
        };
      });

      return [...sections];
    }

    default: {
      return portfolio;
    }
  }
};
