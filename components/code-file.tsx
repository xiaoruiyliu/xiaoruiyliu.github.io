import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import ocaml from "highlight.js/lib/languages/ocaml";

hljs.registerLanguage("ocaml", ocaml);

// A whole source file from public/, shown in a scrollable, highlighted box.
// Each line number has an id like "pbtintro-L34", so a markdown link to
// #pbtintro-L34 scrolls to that line (see JumpLink in markdown.tsx).
type Props = {
  src: string;
  name: string;
  source?: string; // link to the file's home, e.g. on GitHub
  from?: number; // first line to show (1-based); earlier lines are skipped
  to?: number; // last line to show; later lines are skipped
};

const linkClass = "underline text-link hover:opacity-70 transition-opacity";

export const codeFileId = (name: string) => name.replace(/\..*$/, "").toLowerCase();

const CodeFile = ({ src, name, source, from = 1, to }: Props) => {
  const [code, setCode] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [target, setTarget] = useState<number | null>(null);
  const [jumps, setJumps] = useState(0); // replays the flash on repeat clicks
  const id = codeFileId(name);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then(setCode)
      .catch(() => setCode(""));
  }, [src]);

  // Follow #id-L<n> links, including one already in the URL on page load
  useEffect(() => {
    if (code === null) return;
    const jump = () => {
      const match = window.location.hash.match(new RegExp(`^#${id}-L(\\d+)$`));
      if (!match) return;
      setTarget(Number(match[1]));
      setJumps((n) => n + 1);
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    jump();
    window.addEventListener("hashchange", jump);
    return () => window.removeEventListener("hashchange", jump);
  }, [code, id]);

  const lines = code?.replace(/\n$/, "").split("\n").slice(from - 1, to) ?? [];
  const html = code ? hljs.highlight(lines.join("\n"), { language: "ocaml" }).value : "";

  return (
    <span className="block my-4 border-2 border-black/20 bg-black/5 text-left">
      <span className="flex items-baseline justify-between gap-4 px-3 py-1.5 border-b border-black/20 text-[14px] font-normal">
        <span className="font-mono">{name}</span>
        <span className="flex gap-3">
          <button type="button" onClick={() => setExpanded((e) => !e)} className={linkClass}>
            {expanded ? "Collapse" : "Expand"}
          </button>
          {source && (
            <a href={source} target="_blank" rel="noreferrer" className={linkClass}>
              GitHub
            </a>
          )}
          <a href={src} download={name} className={linkClass}>
            Download
          </a>
        </span>
      </span>
      <span className={`relative flex overflow-auto text-[13px] leading-[1.5] font-mono ${expanded ? "" : "max-h-[28rem]"}`}>
        {code === null ? (
          <span className="px-3 py-2 text-gray-600">Loading…</span>
        ) : (
          <>
            {target !== null && target >= from && target < from + lines.length && (
              <span
                key={jumps}
                aria-hidden
                className="absolute inset-x-0 h-[1.5em] bg-navy/20 border-l-2 border-navy pointer-events-none animate-line-flash"
                style={{ top: `calc(0.5rem + ${target - from} * 1.5em)` }}
              />
            )}
            <span aria-hidden className="flex-none px-2 py-2 text-right text-gray-500 border-r border-black/10 select-none">
              {lines.map((_, i) => (
                <span key={i} id={`${id}-L${i + from}`} className="block">
                  {i + from}
                </span>
              ))}
            </span>
            <code className="block px-3 py-2 whitespace-pre" dangerouslySetInnerHTML={{ __html: html }} />
          </>
        )}
      </span>
    </span>
  );
};

export default CodeFile;
