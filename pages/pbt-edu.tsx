import Layout from "../components/layout";
import { getContent } from "../lib/api";
import Head from "next/head";
import { instrumentSans } from "../lib/fonts";
import Footer from "../components/footer";
import Section from "../components/section";
import Markdown from "../components/markdown";

type Props = {
  intro: string;
  whatIsPbt: string;
  howWeTaught: string;
};

export default function PbtEdu({ intro, whatIsPbt, howWeTaught }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Property-Based Testing Materials</title>
        </Head>
        <div className="max-w-4xl mb-6">
          <header className="mt-4 mb-4 px-8 md:px-16">
            <h1 className={`${instrumentSans.className} text-navy text-left text-[32px] leading-tight tracking-tight`}>
              Property-Based Testing Materials
            </h1>
          </header>

          <section className="px-8 md:px-16">
            <div className="text-justify hyphens-auto text-[17px] font-extralight">
              <Markdown>{intro}</Markdown>
            </div>
          </section>
        </div>
        <Section title="What is PBT?">
          <Markdown>{whatIsPbt}</Markdown>
        </Section>
        <Section title="How we taught PBT">
          {/* indent top-level lists in this section only */}
          <div className="[&>ul]:pl-6">
            <Markdown>{howWeTaught}</Markdown>
          </div>
        </Section>
        <Footer />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      intro: getContent("pbt-edu/intro"),
      whatIsPbt: getContent("pbt-edu/what-is-pbt"),
      howWeTaught: getContent("pbt-edu/how-we-taught"),
    },
  };
};
