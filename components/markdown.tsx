import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ocaml from "highlight.js/lib/languages/ocaml";
import remarkCycle from "../lib/remark-cycle";
import Cycle from "./cycle";
import Slides from "./slides";
import CodeFile from "./code-file";

const linkClass = "underline font-normal text-link hover:opacity-70 duration-200 transition-opacity";

// "PBT Starter Pack" -> "pbt-starter-pack", so headings can be linked as #pbt-starter-pack
const textOf = (node: any): string => node.value ?? (node.children ?? []).map(textOf).join("");
const slug = (node: any) =>
  textOf(node).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

type Props = {
  children: string;
  boldLists?: boolean;
};

const Markdown = ({ children, boldLists = false }: Props) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm, remarkCycle]}
    // OCaml isn't in lowlight's default language set, so register it here
    rehypePlugins={[[rehypeHighlight, { languages: { ocaml }, ignoreMissing: true }]]}
    skipHtml
    components={{
      // @ts-expect-error: custom element produced by remarkCycle
      cycle: ({ node, options }) => <Cycle options={options} />,
      a: ({ node, href, children, ...props }) => {
        const line = href?.match(/^#[\w-]+-L(\d+)$/)?.[1];
        if (!line) return <a className={linkClass} href={href} {...props}>{children}</a>;
        // [text](#pbtintro-L34) jumps to line 34 of the pbtIntro.ml code viewer
        return (
          <a
            href={href}
            onClick={(e) => {
              // set the hash without the browser's own instant jump; CodeFile scrolls smoothly instead
              e.preventDefault();
              history.pushState(null, "", href);
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }}
            title={`Jump to line ${line}`}
            className="group/jump font-normal text-link decoration-dotted underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            {children}
            <span className="ml-1 inline-flex items-center align-[0.1em] rounded-sm bg-navy/10 p-0.5 text-navy group-hover/jump:bg-navy/20">
              <svg aria-hidden viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2v8M3 7l3 3 3-3" />
              </svg>
            </span>
          </a>
        );
      },
      // ![Title](/folder/ "16") is a 16-slide deck in public/folder/ (see components/slides.tsx)
      // ![file.ml](/file.ml "https://github.com/...") shows the whole source file;
      // /file.ml#L5 starts at line 5, /file.ml#L5-L300 shows lines 5 through 300
      img: ({ node, src, alt, title, ...props }) => {
        const code = src?.match(/^(.*\.ml)(?:#L(\d+)(?:-L(\d+))?)?$/);
        if (code) {
          const [, path, from, to] = code;
          return <CodeFile src={path} name={alt ?? path} source={title} from={from ? Number(from) : undefined} to={to ? Number(to) : undefined} />;
        }
        return src?.endsWith("/") ? (
          <Slides folder={src} count={Number(title)} title={alt ?? "Slides"} />
        ) : (
          <img src={src} alt={alt} title={title} {...props} />
        );
      },
      p: ({ node, ...props }) => <p className="mb-4 last:mb-0 [&:has(+ul)]:mb-1" {...props} />,
      strong: ({ node, ...props }) => <b className="font-semibold underline" {...props} />,
      h3: ({ node, ...props }) => <h3 id={slug(node)} className="font-normal mt-4 first:mt-0 [h4+&]:mt-1" {...props} />,
      h4: ({ node, ...props }) => <h4 id={slug(node)} className="text-[19px] uppercase tracking-wider font-semibold text-gray-700 mt-8 mb-1 first:mt-0" {...props} />,
      h5: ({ node, ...props }) => <h5 id={slug(node)} className="text-[18px] font-semibold text-navy border-l-2 border-navy pl-2 mt-6 mb-2 first:mt-0" {...props} />,
      blockquote: ({ node, children }) => (
        <blockquote className="flex gap-1.5 pl-1 mt-1 text-[15px] [&_p]:mb-0">
          <svg aria-hidden viewBox="0 0 16 24" className="flex-none w-[0.7em] h-[1.5em] text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v10h10M10 10l3 3-3 3" />
          </svg>
          <div>{children}</div>
        </blockquote>
      ),
      pre: ({ node, ...props }) => (
        <pre className="text-left text-[14px] font-normal bg-black/5 border border-black/20 px-4 py-3 my-4 overflow-x-auto" {...props} />
      ),
      code: ({ node, inline, className, ...props }) => (
        <code className={`font-mono ${inline ? "text-[15px] font-normal bg-black/5 px-1" : ""} ${className ?? ""}`} {...props} />
      ),
      ul: ({ node, ...props }) => <ul className={`text-[16px] [&_ul]:text-[15px] [&_ul]:list-disc [&_ul]:pl-6 ${boldLists ? "font-normal [&_ul]:font-extralight" : ""}`} {...props} />,
    }}
  >
    {children}
  </ReactMarkdown>
);

export default Markdown;
