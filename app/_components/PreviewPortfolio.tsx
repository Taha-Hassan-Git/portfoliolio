import { useState, useEffect } from "react";
import {
  PortfolioType,
  SectionType,
  SubsectionType,
  usePortfolioPreview,
} from "../_store/store";

export function PreviewPortfolio({
  portfolio,
  overlay = false,
  classNames = "",
}: {
  portfolio: PortfolioType;
  overlay?: boolean;
  classNames?: string;
}) {
  return (
    <div
      className={
        "relative border p-10 overflow-hidden max-h-[400px] flex flex-col gap-2 " +
        classNames
      }
    >
      {portfolio.sections.map((section) => (
        <>
          <p className="text-xl" key={section.id + section.title + "preview"}>
            {section.title}
          </p>
          <ol>
            {section.subsection.map((subsection) => (
              <li
                className="ml-10 list-decimal"
                key={subsection.id + subsection.title + "preview"}
              >
                <p className="text-lg">{subsection.title}</p>
              </li>
            ))}
          </ol>
        </>
      ))}
      {overlay && (
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-white to-transparent"></div>
      )}
    </div>
  );
}

export function PreviewPortfolioEdit({
  portfolio,
  classNames = "",
}: {
  portfolio: PortfolioType;
  overlay?: boolean;
  classNames?: string;
}) {
  return (
    <div
      className={
        "relative border p-10 overflow-hidden flex flex-col gap-2 h-full " +
        classNames
      }
    >
      {portfolio.sections.map((section) => (
        <Section
          key={section.id + section.title + "preview"}
          section={section}
        />
      ))}
    </div>
  );
}

function Section({ section }: { section: SectionType }) {
  const { previewDispatch } = usePortfolioPreview();
  const [title, setTitle] = useState(section.title);

  useEffect(() => {
    setTitle(section.title);
  }, [section.title]);

  const handleSectionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    const newSection = { ...section, title };
    previewDispatch &&
      previewDispatch({
        type: "EDIT_SECTION_TITLE",
        payload: newSection,
      });
  };

  return (
    <div>
      <input
        className="text-xl"
        value={title}
        onChange={handleSectionTitleChange}
        onBlur={handleBlur}
      />
      {section.subsection.map((subsection) => (
        <SubSection
          key={subsection.id + subsection.title + "preview"}
          subsection={subsection}
        />
      ))}
    </div>
  );
}

function SubSection({ subsection }: { subsection: SubsectionType }) {
  const { previewDispatch } = usePortfolioPreview();
  const [title, setTitle] = useState(subsection.title);

  useEffect(() => {
    setTitle(subsection.title);
  }, [subsection.title]);

  const handleSubsectionTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    const newSubsection = { ...subsection, title };
    console.log(newSubsection);
    previewDispatch &&
      previewDispatch({
        type: "EDIT_SUBSECTION_TITLE",
        payload: newSubsection,
      });
  };

  return (
    <li className="ml-1 list-decimal w-full">
      <input
        className="text-sm w-[90%]"
        value={title}
        onChange={handleSubsectionTitleChange}
        onBlur={handleBlur}
      />
    </li>
  );
}
