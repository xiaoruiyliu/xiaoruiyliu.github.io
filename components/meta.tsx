import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <meta name="theme-color" content="#000" />
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="description" content="Xiaorui Liu's personal website" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <meta property="og:title" content="Xiaorui Liu" />
    </Head>
  );
};

export default Meta;
