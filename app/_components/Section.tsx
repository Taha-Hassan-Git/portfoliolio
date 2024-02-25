import { useState, useEffect } from "react";
import { SectionType, usePreviewDispatch } from "../_store/store";
import { SubSection } from "./SubSection";
import { Input } from "./Input";

export function Section({ section }: { section: SectionType }) {
  const previewDispatch = usePreviewDispatch();
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
    previewDispatch({
      type: dispatchtype,
      payload: newSection,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Input
        className="text-2xl font-bold"
        value={title}
        onChange={handleSectionTitleChange}
        onBlur={() => handleBlur("EDIT_SECTION_TITLE")}
      />
      <Input
        className="text-sm font-light"
        value={description}
        onChange={handleSectionDescriptionChange}
        onBlur={() => handleBlur("EDIT_SECTION_DESCRIPTION")}
      />
      {section.subsection.length > 1 &&
        section.subsection.map((subsection) => (
          <SubSection
            key={subsection.id + subsection.title + "preview"}
            subsection={subsection}
          />
        ))}
    </div>
  );
}
