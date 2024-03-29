import { useCallback, useReducer } from "react";
import { useLocalStorage } from "react-use";
import {
  PortfolioType,
  ActionTypes,
  SectionType,
  SubsectionType,
} from "../_store/store";

const INITIAL_STATE: PortfolioType = {
  id: 0,
  sections: [],
};

const reducer = (
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

export const usePersistReducer = (key: string) => {
  // grab saved value from `localStorage` and
  // a function to update it. if
  // no value is retrieved, use `INITIAL_STATE`
  const [savedState, saveState] = useLocalStorage(key, INITIAL_STATE);

  // wrap `reducer` with a memoized function that
  // syncs the `newState` to `localStorage` before
  // returning `newState`. memoizing is important!
  const reducerLocalStorage = useCallback(
    (state: PortfolioType, action: ActionTypes) => {
      const newState = reducer(state, action);
      saveState(newState);

      return newState;
    },
    [saveState]
  );
  // use wrapped reducer and the saved value from
  // `localStorage` as params to `useReducer`.
  // this will return `[state, dispatch]`

  //todo: this might not work
  return useReducer(reducerLocalStorage, savedState ?? INITIAL_STATE);
};
