import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCycle from "../lib/remark-cycle";
import Cycle from "./cycle";

const linkClass = "underline font-normal text-link hover:opacity-70 duration-200 transition-opacity";

type Props = {
  children: string;
  boldLists?: boolean;
};

const Markdown = ({ children, boldLists = false }: Props) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm, remarkCycle]}
    skipHtml
    components={{
      // @ts-expect-error: custom element produced by remarkCycle
      cycle: ({ node, options }) => <Cycle options={options} />,
      a: ({ node, ...props }) => <a className={linkClass} {...props} />,
      p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
      strong: ({ node, ...props }) => <b className="font-semibold underline" {...props} />,
      h3: ({ node, ...props }) => <h3 className="font-normal mt-4 first:mt-0 [h4+&]:mt-1" {...props} />,
      h4: ({ node, ...props }) => <h4 className="text-[17px] uppercase tracking-wider font-semibold text-gray-700 mt-8 mb-1 first:mt-0" {...props} />,
      blockquote: ({ node, children }) => (
        <blockquote className="flex gap-1.5 pl-1 mt-1 text-[15px] [&_p]:mb-0">
          <svg aria-hidden viewBox="0 0 16 24" className="flex-none w-[0.7em] h-[1.5em] text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v10h10M10 10l3 3-3 3" />
          </svg>
          <div>{children}</div>
        </blockquote>
      ),
      ul: ({ node, ...props }) => <ul className={`text-[16px] [&_ul]:text-[15px] [&_ul]:list-disc [&_ul]:pl-6 ${boldLists ? "font-normal [&_ul]:font-extralight" : ""}`} {...props} />,
    }}
  >
    {children}
  </ReactMarkdown>
);

export default Markdown;
