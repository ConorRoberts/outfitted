import { getProviders, signIn } from "next-auth/client";
import Image from "next/image";
import Header from "@components/Header";
import styles from "@styles/SignIn.module.scss";

const getImage = (name) => {
  switch (name) {
    case "Google":
      return <Image src="/Google_Logo.svg" width={260} height={260} />;
  }
};

const Option = ({ name, providerID }) => {
  return (
    <button className={styles.option} onClick={() => signIn(providerID)}>
      <div className={styles.optionImage}>{getImage(name)}</div>
      <p className={styles.optionLabel}>{name}</p>
    </button>
  );
};

export default function SignIn({providers}) {
  return (
    <div>
      <Header title="Sign In" />

      <div className={styles.container}>
        <div className={styles.optionContainer}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.optionList}>
            {Object.values(providers).map((provider) => (
              <Option
                key={provider.name}
                name={provider.name}
                providerID={provider.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
