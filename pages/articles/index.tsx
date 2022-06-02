import { NextPageContext } from "next";

const Page = () => {
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {},
  };
};

export default Page;
