"use client";

import { ReactNode, createContext, useContext, useReducer } from "react";

export const exampleSections = [
  {
    id: 1,
    title: "Introduction",
    description: "",
    subsection: [
      {
        id: 1,
        title: "Overview",
        description: "overview of team structure and processes",
        content: "overview of team structure and processes",
        ksbs: [
          "K1: Describes all stages of the software development lifecycle",
          "B4: Illustrates how they have worked collaboratively with people in different roles, internally and externally",
        ],
      },
      {
        id: 2,
        title: "Roles and Responsibilities",
        description: "engineer's role and responsibilities",
        content: "engineer's role and responsibilities",
        ksbs: [
          "K3: Describes the roles and responsibilities of the project lifecycle within their organisation, and their role",
          "B1: Describes, how they have operated independently to complete tasks to given deadlines which reflect the level of responsibility assigned to them by the organisation",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Trustpilot Project",
    description: "",
    subsection: [
      {
        id: 3,
        title: "Planning and Requirements Gathering",
        description: "planning and requirements gathering",
        content: "planning and requirements gathering",
        ksbs: [
          "K5: Describes the similarities and differences between different software development methodologies",
          "S9: Creates analysis artefacts, such as use cases and/or user stories to enable effective delivery of software activities",
        ],
      },
      {
        id: 4,
        title: "Analysis and Design",
        description: "analysis and design",
        content: "analysis and design",
        ksbs: [
          "K7: Suggests and applies different software design approaches and patterns",
          "S8: Creates simple software designs to communicate understanding of the programme to stakeholders and users of the programme",
        ],
      },
      {
        id: 5,
        title: "Build and Development",
        description: "build and development",
        content: "build and development",
        ksbs: [
          "S3: Explains, how they have linked code to data sets",
          "S17: Explains, how they have interpreted and implemented a given design whilst remaining compliant with security and maintainability requirements",
        ],
      },
      {
        id: 6,
        title: "Testing",
        description: "testing",
        content: "testing",
        ksbs: [
          "K12: Describes basic software testing frameworks and methodologies",
          "S5: Illustrates how to conduct test types, including Integration, System, User Acceptance, Non-Functional, Performance and Security testing",
        ],
      },
      {
        id: 7,
        title: "Deployment",
        description: "deployment",
        content: "deployment",
        ksbs: [
          "K8: Explains the relevance of organisational policies and procedures relating to the tasks being undertaken",
          "B7: Explains how they have communicated effectively in a variety of situations to both a technical and non-technical audience",
        ],
      },
      {
        id: 8,
        title: "Maintenance",
        description: "maintenance",
        content: "maintenance",
        ksbs: [
          "B6: Illustrates their approach to meeting unexpected minor changes at work",
          "B8: Illustrates how they have responded to the business context with curiosity to explore new opportunities and techniques",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "1939 Takedown Form",
    description: "",
    subsection: [
      {
        id: 5,
        title: "Planning and Requirements",
        description: "planning and requirements for the 1939 Takedown Form",
        content:
          "Detailing the planning and requirements phase for the 1939 Takedown Form project",
        ksbs: [
          "K1: Describes all stages of the software development lifecycle",
          "S9: Creates analysis artefacts, such as use cases and/or user stories to enable effective delivery of software activities",
        ],
      },
      {
        id: 6,
        title: "Analysis and Technical Planning",
        description:
          "analysis and technical planning for the 1939 Takedown Form",
        content:
          "Discussing the analysis and technical planning phase of the 1939 Takedown Form project",
        ksbs: [
          "K5: Describes the similarities and differences between different software development methodologies",
          "S2: Explains, their own approach to development of user interfaces",
        ],
      },
      {
        id: 7,
        title: "Design",
        description: "design phase for the 1939 Takedown Form",
        content:
          "Outlining the design considerations and approaches for the 1939 Takedown Form",
        ksbs: [
          "S8: Creates simple software designs to communicate understanding of the programme to stakeholders and users of the programme",
          "K7: Suggests and applies different software design approaches and patterns",
        ],
      },
      {
        id: 8,
        title: "Build",
        description: "build process for the 1939 Takedown Form",
        content:
          "Describing the build process and development challenges in the 1939 Takedown Form project",
        ksbs: [
          "S17: Explains, how they have interpreted and implemented a given design whilst remaining compliant with security and maintainability requirements",
          "S3: Explains, how they have linked code to data sets",
        ],
      },
      {
        id: 9,
        title: "Deployment",
        description: "deployment process for the 1939 Takedown Form",
        content:
          "Detailing the deployment strategy and challenges for the 1939 Takedown Form",
        ksbs: [
          "B7: Explains how they have communicated effectively in a variety of situations to both a technical and non-technical audience",
          "K8: Explains the relevance of organisational policies and procedures relating to the tasks being undertaken",
        ],
      },
      {
        id: 10,
        title: "Testing",
        description: "testing process for the 1939 Takedown Form",
        content:
          "Discussing the testing methodologies and frameworks used in the 1939 Takedown Form project",
        ksbs: [
          "S5: Illustrates how to conduct test types, including Integration, System, User Acceptance, Non-Functional, Performance and Security testing",
          "K12: Describes basic software testing frameworks and methodologies",
        ],
      },
      {
        id: 11,
        title: "Maintenance",
        description: "maintenance phase for the 1939 Takedown Form",
        content:
          "Exploring the maintenance strategies and challenges post-deployment of the 1939 Takedown Form",
        ksbs: [
          "B6: Illustrates their approach to meeting unexpected minor changes at work",
          "B5: Explains how they have established an approach in the workplace which reflects integrity with respect to ethical, legal, and regulatory matters",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Transcription Error Reporting Form",
    description: "",
    subsection: [
      {
        id: 12,
        title: "Planning and Requirements",
        description:
          "planning and requirements for the Transcription Error Reporting Form",
        content:
          "Detailing the planning and requirements phase for the Transcription Error Reporting Form project",
        ksbs: [
          "S9: Creates analysis artefacts, such as use cases and/or user stories to enable effective delivery of software activities",
          "K5: Describes the similarities and differences between different software development methodologies",
        ],
      },
      {
        id: 13,
        title: "Analysis",
        description: "analysis for the Transcription Error Reporting Form",
        content:
          "Analyzing the needs and technical considerations for the Transcription Error Reporting Form",
        ksbs: [
          "K10: Applies the principles and uses of relational and non-relational databases to software development tasks",
          "K7: Suggests and applies different software design approaches and patterns",
        ],
      },
      {
        id: 14,
        title: "Design",
        description: "design phase for the Transcription Error Reporting Form",
        content:
          "Outlining the design process and creative solutions for the Transcription Error Reporting Form",
        ksbs: [
          "S8: Creates simple software designs to communicate understanding of the programme to stakeholders and users of the programme",
          "S2: Explains, their own approach to development of user interfaces",
        ],
      },
      {
        id: 15,
        title: "Build",
        description: "build process for the Transcription Error Reporting Form",
        content:
          "Discussing the development and coding challenges in the Transcription Error Reporting Form project",
        ksbs: [
          "S3: Explains, how they have linked code to data sets",
          "K12: Describes basic software testing frameworks and methodologies",
        ],
      },
      {
        id: 16,
        title: "Deployment",
        description:
          "deployment strategy for the Transcription Error Reporting Form",
        content:
          "Detailing the deployment process and challenges for the Transcription Error Reporting Form",
        ksbs: [
          "B7: Explains how they have communicated effectively in a variety of situations to both a technical and non-technical audience",
          "K8: Explains the relevance of organisational policies and procedures relating to the tasks being undertaken",
        ],
      },
      {
        id: 17,
        title: "Testing",
        description:
          "testing process for the Transcription Error Reporting Form",
        content:
          "Exploring the various testing methodologies used in the Transcription Error Reporting Form project",
        ksbs: [
          "S5: Illustrates how to conduct test types, including Integration, System, User Acceptance, Non-Functional, Performance and Security testing",
          "K12: Describes basic software testing frameworks and methodologies",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Final Considerations",
    description: "",
    subsection: [
      {
        id: 9,
        title: "Summary of Skills Gained",
        description: "summary of skills gained",
        content: "summary of skills gained",
        ksbs: [
          "B9: Explains how they reflect on their continued professional development and act independently to seek out new opportunities",
          "S13: Illustrates how to conduct test types, including Integration, System, User Acceptance, Non-Functional, Performance and Security testing",
        ],
      },
      {
        id: 10,
        title: "Areas for Future Improvement",
        description: "areas for future improvement",
        content: "areas for future improvement",
        ksbs: [
          "B8: Illustrates how they have responded to the business context with curiosity to explore new opportunities and techniques",
          "B7: Explains how they have communicated effectively in a variety of situations to both a technical and non-technical audience",
        ],
      },
    ],
  },
];

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

// Add an action to set the porfolio
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
const PortfolioDispatchContext = createContext<DispatchType | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, dispatch] = useReducer(portfolioReducer, {
    id: 0,
    sections: exampleSections,
  });
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
      console.log("SET_PORTFOLIO");
      const payload = action.payload as PortfolioType;
      return payload;
    }

    default: {
      return portfolio;
    }
  }
};

const usermessage =
  "I'm an apprentice at a company called tldraw, they make an open source developer library that helps people make applications based around a collaborative whiteboard. They also make an online collaborative whiteboard of their own, which is free-to-use and has features allowing a user to log in and save projects. Introduction Overview of tldraw and their products Description of your role and responsibilities as an apprentice Tldraw Open Source Library Contributions to the open source library codebase (specific features, bug fixes, optimizations etc.) Pull requests and code reviews Documentation contributions Community engagement (GitHub issues, StackOverflow etc.) Tldraw Online Whiteboard Work on front-end components and views Back-end features like user accounts and data storage Collaborative editing implementation Performance optimizations and testing Integration with authentication providers Design and Branding Contributions to UI, UX and visual design Development of style guides, components and themes Accessibility and internationalization Testing and Quality Assurance Writing unit and integration tests Setting up CI/CD pipelines Automated visual regression testing Cross-browser and device testing Conclusion Dev Dashboard Created internal tool to track GitHub repositories Integrations with GitHub API to pull data on issues, pull requests, contributors etc. Tracking of social media channels and analytics Data visualizations and reporting dashboards Alerting based on repository activity Technologies used like React, Node.js, MongoDB Key skills learned and improved Areas of focus for future growth";
