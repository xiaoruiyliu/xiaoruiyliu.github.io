import Meta from "./meta";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen flex justify-center items-start bg-side-bg bg-herringbone px-4 py-8 md:py-10">
        <div className="max-w-4xl w-full bg-center-bg border-2 border-black pt-4">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
