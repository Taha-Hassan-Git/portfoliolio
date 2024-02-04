import { PortfolioType } from "../_store/store";

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
    </div>
  );
}
