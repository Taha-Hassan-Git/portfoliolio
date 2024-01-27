"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { redirect, usePathname } from "next/navigation";
import { SectionType, SubsectionType, usePortfolio } from "../_store/store";
import { ChevronDown } from "./icons";

export const SectionMenu = () => {
  const portfolio = usePortfolio();
  const pathname = usePathname();
  if (portfolio.sections.length === 0) return redirect("/");

  let sectionTitle = pathname.split("/")[2];
  if (sectionTitle) {
    sectionTitle = sectionTitle.replace(/%20/g, " ");
  }

  return (
    <div className="flex flex-col self-start h-full w-[300px] items-baseline gap-4 bg-gray-50">
      <Accordion.Root type="multiple" className="w-full">
        {portfolio.sections.length > 0 && (
          <div className="flex flex-col gap-1 items-baseline bg-gray-50">
            {portfolio.sections.map((section) => (
              <Accordion.Item
                key={section.title}
                value={section.title}
                className="w-full"
              >
                <div className="flex flex-col items-center p-4 w-full">
                  <Accordion.Trigger className="text-sm font-normal flex gap-3 justify-between items-center group w-full border-2 border-black p-2 hover:bg-gray-100 [box-shadow:3px_3px_#b6b6b6] data-[state=open]:[box-shadow:3px_3px_rgb(82_82_82)]">
                    <div className="text-left overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                      <p className="overflow-ellipses">{section.title}</p>
                    </div>
                    <ChevronDown className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:-rotate-90" />
                  </Accordion.Trigger>
                  <Accordion.Content className="w-full text-left">
                    <div className="flex gap-2 mt-2">
                      <div className="w-5 border-r-2"></div>
                      <div className="flex flex-col items-start gap-2 w-full">
                        {section.subsection.map((subsection) => (
                          <SubsectionLink
                            key={"sidebar" + subsection.id}
                            subsection={subsection}
                            section={section}
                          />
                        ))}
                      </div>
                    </div>
                  </Accordion.Content>
                </div>
              </Accordion.Item>
            ))}
          </div>
        )}
      </Accordion.Root>
    </div>
  );
};
function SubsectionLink({
  section,
  subsection,
}: {
  section: SectionType;
  subsection: SubsectionType;
}) {
  const pathname = usePathname();

  const isActive =
    pathname === `/write/${section.title + "/" + subsection.title}`;

  return (
    <a
      href={`/write/${section.title + "/" + subsection.title}`}
      className={
        "font-bold w-[250px] border-black border-2 p-2 hover:bg-gray-100 [box-shadow:3px_3px_#b6b6b6]" +
        (isActive ? " bg-black text-white hover:bg-black" : "")
      }
    >
      <div className="text-left overflow-hidden whitespace-nowrap text-overflow-ellipsis">
        <p className="overflow-ellipses">{subsection.title}</p>
      </div>
    </a>
  );
}
