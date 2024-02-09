"use client";
import { useState, useEffect } from "react";
import {
  PortfolioType,
  SectionType,
  usePortfolioPreview,
  SubsectionType,
} from "../_store/store";

export function EditPreviewPortfolio({
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
        "relative p-10 overflow-scroll flex flex-col gap-2 h-full w-full " +
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
  const [description, setDescription] = useState(section.description);

  useEffect(() => {
    setTitle(section.title);
  }, [section.title]);

  const handleSectionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSectionDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleBlur = (
    dispatchtype: "EDIT_SECTION_TITLE" | "EDIT_SECTION_DESCRIPTION"
  ) => {
    const newSection = { ...section, title };
    previewDispatch &&
      previewDispatch({
        type: dispatchtype,
        payload: newSection,
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <Input
        value={title}
        onChange={handleSectionTitleChange}
        onBlur={() => handleBlur("EDIT_SECTION_TITLE")}
      />
      <Input
        value={description}
        onChange={handleSectionDescriptionChange}
        onBlur={() => handleBlur("EDIT_SECTION_DESCRIPTION")}
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
  const [description, setDescription] = useState(subsection.description);

  useEffect(() => {
    setTitle(subsection.title);
  }, [subsection.title]);

  const handleSubsectionTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(e.target.value);
  };
  const handleSubsectionDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleBlur = (
    dispatchtype: "EDIT_SUBSECTION_TITLE" | "EDIT_SUBSECTION_DESCRIPTION"
  ) => {
    const newSubsection = { ...subsection, title };
    console.log(newSubsection);
    previewDispatch &&
      previewDispatch({
        type: dispatchtype,
        payload: newSubsection,
      });
  };

  return (
    <li className="ml-1 list-decimal w-full">
      <Input
        value={title}
        onChange={handleSubsectionTitleChange}
        onBlur={() => handleBlur("EDIT_SUBSECTION_TITLE")}
      />
      <Input
        value={description}
        onChange={handleSubsectionDescriptionChange}
        onBlur={() => handleBlur("EDIT_SUBSECTION_DESCRIPTION")}
      />
    </li>
  );
}

function Input({
  value,
  onChange,
  onBlur,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
}) {
  return (
    <Input
      className={"text-sm p-2 w-[90%] rounded " + className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
