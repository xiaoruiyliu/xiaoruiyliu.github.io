import { instrumentSans } from "../lib/fonts";

type Props = {
  title: string;
  note?: string;
  children: React.ReactNode;
};

const Section = ({ title, note, children }: Props) => {
  return (
    <section className="px-8 md:px-16 mb-10">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 className={`${instrumentSans.className} text-navy text-[24px] leading-tight tracking-tight`}>
          {title}
        </h2>
        {note && <p className="text-[13px] font-extralight">{note}</p>}
      </div>
      <div className="text-justify hyphens-auto text-[17px] font-extralight">{children}</div>
    </section>
  );
};

export default Section;
