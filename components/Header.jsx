import styles from "../styles/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import useAdminStatus from "../utils/useAdminStatus";
import { signIn, signOut, useSession } from "next-auth/client";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { RiAdminFill, RiFeedbackFill } from "react-icons/ri";
import { FaRegNewspaper } from "react-icons/fa";
import { BsFileEarmarkPlus, BsPlusCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { GiHanger } from "react-icons/gi";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Divider,
} from "@chakra-ui/react";
import Head from "next/head";
import { theme } from "../globalStyles";

const LoginButton = () => {
  return (
    <span className={styles.loginBtn} onClick={() => signIn()}>
      Login
    </span>
  );
};
const LogoutButton = () => {
  return (
    <span className={styles.loginBtn} onClick={() => signOut()}>
      Logout
    </span>
  );
};

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Image priority src="/outfitted.png" width={512} height={163} />
      <div className={styles.logoImageContainer}></div>
    </div>
  );
};

const Header = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const admin = useAdminStatus();
  const [session, loading] = useSession();
  const formattedTitle = `${title} | Outfitted`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{formattedTitle}</title>
        <link rel="icon" type="image/png" href="/logo-no-bg.png" />

        <meta name="description" content="Page description" />
        <meta property="og:title" content={formattedTitle} />
        <meta
          property="og:description"
          content="Taking the stress out of getting dressed."
        />
        <meta property="og:image" content="https://i.imgur.com/8d001jz.png" />
        <meta property="og:image:alt" content="Outfitted header" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="https://i.imgur.com/8d001jz.png" />
        <meta name="theme-color" content={theme.bgLight}></meta>
      </Head>
      <ul className={styles.mobile}>
        <li>
          <Link passHref href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </li>
        <ul>
          {/* Show if the user is logged in */}
          {session && (
            <li className={styles.greetingContainer}>
              <span className={styles.greetingHey}>Welcome, </span>
              {session.user.name}
            </li>
          )}

          {/* Show if the user isn't logged in */}
          {!session && !loading && (
            <li>
              <LoginButton />
            </li>
          )}
          {/* {session && (
            <li className={styles.closetLink}>
              <Link href="/closet">Closet</Link>
            </li>
          )} */}
          <li>
            <Button
              ref={btnRef}
              size="sm"
              fontSize="1.6rem"
              color="#93F3FE"
              colorScheme="none"
              onClick={onOpen}
            >
              <GiHamburgerMenu />
            </Button>
          </li>
        </ul>
      </ul>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay>
          <DrawerContent background="#1A202C">
            <DrawerCloseButton color="#93F3FE" />
            <DrawerHeader>
              <Logo />
            </DrawerHeader>

            <DrawerBody>
              <ul className={styles.drawerLinks}>
                <li>
                  <Link passHref href="/">
                    <a className={styles.link}>
                      <span className={styles.icon}>
                        <FaHome />
                      </span>
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/articles">
                    <a className={styles.link}>
                      <span className={styles.icon}>
                        <FaRegNewspaper />
                      </span>
                      Articles
                    </a>
                  </Link>
                </li>
                {session && (
                  <>
                    <li>
                      <Link passHref href="/newsletters">
                        <a className={styles.link}>
                          <span className={styles.icon}>
                            <GiHanger />
                          </span>
                          Newsletter
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link passHref href="/preferences">
                        <a className={styles.link}>
                          <span className={styles.icon}>
                            <IoMdSettings />
                          </span>
                          Preferences
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link passHref href="/feedback">
                        <a className={styles.link}>
                          <span className={styles.icon}>
                            <RiFeedbackFill />
                          </span>
                          Feedback
                        </a>
                      </Link>
                    </li>
                    {admin && (
                      <>
                        <Divider />
                        <li>
                          <Link passHref href="/admin">
                            <a className={styles.link}>
                              <span className={styles.icon}>
                                <RiAdminFill />
                              </span>
                              Admin
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link passHref href="/admin/articles/new">
                            <a className={styles.link}>
                              <span className={styles.icon}>
                                <BsFileEarmarkPlus />
                              </span>
                              Create Article
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link passHref href="/admin/create_item">
                            <a className={styles.link}>
                              <span className={styles.icon}>
                                <BsPlusCircle />
                              </span>
                              Create Item
                            </a>
                          </Link>
                        </li>
                        <Divider />
                      </>
                    )}
                    <li>
                      <LogoutButton />
                    </li>
                  </>
                )}
              </ul>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default Header;
