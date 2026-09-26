import Intro from "../components/intro";
import Layout from "../components/layout";
import { getContent } from "../lib/api";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";
import Footer from "../components/footer";
import Section from "../components/section";
import Markdown from "../components/markdown";

type Props = {
  bio: string;
  publications: string;
  teaching: string;
  lore: string;
};

export default function Index({ bio, publications, teaching, lore }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Intro bio={bio} />
        <Section title="Publications" note="* denotes equal contribution">
          <Markdown>{publications}</Markdown>
        </Section>
        <Section title="Teaching">
          <Markdown boldLists>{teaching}</Markdown>
        </Section>
        <Section title="Lore">
          <Markdown>{lore}</Markdown>
        </Section>
        <Footer />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      bio: getContent("bio"),
      publications: getContent("publications"),
      teaching: getContent("teaching"),
      lore: getContent("lore"),
    },
  };
};
