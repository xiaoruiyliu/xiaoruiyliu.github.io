import { useState } from "react";

// Folder of 1.jpg ... {count}.jpg rendered from {folder}slides.pdf, with the
// blank top and bottom of each slide cropped off (792x612pt page -> 792x440)
type Props = {
  folder: string;
  count: number;
  title: string;
};

const arrowClass =
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-navy/80 text-center-bg shadow-sm opacity-70 sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-navy transition duration-200 disabled:!opacity-0 disabled:pointer-events-none";

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg aria-hidden viewBox="0 0 24 24" className={`w-5 h-5 ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

const Slides = ({ folder, count, title }: Props) => {
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => Math.min(count - 1, Math.max(0, i + step)));

  return (
    <span className="block my-4">
      <span
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        className="group relative block border-2 border-black/20 bg-white outline-none focus-visible:ring-2 focus-visible:ring-navy"
      >
        <img src={`${folder}${index + 1}.jpg`} alt={`${title}, slide ${index + 1} of ${count}`} className="block w-full aspect-[792/440]" />
        {/* preload the next slide so stepping forward doesn't flash */}
        {index + 1 < count && <link rel="prefetch" href={`${folder}${index + 2}.jpg`} />}
        <button type="button" aria-label="Previous slide" onClick={() => go(-1)} disabled={index === 0} className={`${arrowClass} left-2`}>
          <Arrow />
        </button>
        <button type="button" aria-label="Next slide" onClick={() => go(1)} disabled={index === count - 1} className={`${arrowClass} right-2`}>
          <Arrow flip />
        </button>
      </span>
      <span className="flex justify-between mt-1 text-[14px] text-gray-600">
        <span aria-live="polite">
          {index + 1} / {count}
        </span>
        <a href={`${folder}slides.pdf`} target="_blank" rel="noreferrer" className="underline text-link hover:opacity-70 transition-opacity">
          Download PDF
        </a>
      </span>
    </span>
  );
};

export default Slides;
