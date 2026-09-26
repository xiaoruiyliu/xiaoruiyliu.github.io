import { useState } from "react";

type Props = {
  options: string;
};

const Cycle = ({ options }: Props) => {
  const choices = options.split("|");
  const [index, setIndex] = useState(0);
  const next = choices[(index + 1) % choices.length];

  return (
    <button
      type="button"
      onClick={() => setIndex((i) => (i + 1) % choices.length)}
      title={`Click for: ${next}`}
      aria-label={`${choices[index]} (click to show: ${next})`}
      className="inline font-normal text-link border-b border-dashed border-current cursor-pointer hover:opacity-70 transition-opacity"
    >
      <span key={index} className="animate-cycle-in inline-block">
        {choices[index]}
      </span>
    </button>
  );
};

export default Cycle;
