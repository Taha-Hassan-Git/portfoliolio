import { useState, useEffect } from "react";
import { SubsectionType, usePreviewDispatch } from "../_store/store";
import { Input } from "./Input";

export function SubSection({ subsection }: { subsection: SubsectionType }) {
  const previewDispatch = usePreviewDispatch();
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
    previewDispatch({
      type: dispatchtype,
      payload: newSubsection,
    });
  };

  return (
    <li className="ml-2 list-decimal w-full">
      <Input
        className="text-lg font-bold"
        value={title}
        onChange={handleSubsectionTitleChange}
        onBlur={() => handleBlur("EDIT_SUBSECTION_TITLE")}
      />
      <Input
        className="text-sm font-light"
        value={description}
        onChange={handleSubsectionDescriptionChange}
        onBlur={() => handleBlur("EDIT_SUBSECTION_DESCRIPTION")}
      />
      {subsection.ksbs.map((ksb, index) => (
        <p className="text-sm font-thin text-slate-400" key={ksb + index}>
          {ksb}
        </p>
      ))}
    </li>
  );
}
