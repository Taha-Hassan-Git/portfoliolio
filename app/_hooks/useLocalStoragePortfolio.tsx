"use client";
import { useReducer, useEffect, Dispatch } from "react";
import {
  PortfolioType,
  ActionTypes,
  SectionType,
  SubsectionType,
} from "../_store/store";

export const portfolioReducer = (
  portfolio: PortfolioType,
  action: ActionTypes
): PortfolioType => {
  switch (action.type) {
    case "EDIT_SECTION_TITLE": {
      const sections = portfolio.sections.map((section: SectionType) => {
        if (section.id === action.payload.id) {
          const actionPayload = action.payload as SectionType;
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

export function useLocalStoragePortfolio(
  key: string,
  initialState: PortfolioType
): [PortfolioType, Dispatch<ActionTypes>] {
  // Initialize state with initialState. Actual initialization from localStorage
  // will happen inside useEffect to ensure it's client-side
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  useEffect(() => {
    // Attempt to load existing state from localStorage only on client-side
    const storedData =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch({ type: "INITIALIZE", payload: parsedData }); // Assuming you have an 'INITIALIZE' action or similar
    }
  }, [key]);

  // Update local storage whenever the state changes, also only on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, dispatch];
}
