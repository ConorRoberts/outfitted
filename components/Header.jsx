import styles from "../styles/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { BsFileEarmarkPlus,BsPlusCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Divider
} from "@chakra-ui/react"
import { signIn, signOut, useSession } from 'next-auth/client'

const LoginButton = () => {
    return (
        <span className={styles.loginBtn} onClick={() => signIn()}>
            Login
        </span>
    )
}
const LogoutButton = () => {
    return (
        <span className={styles.loginBtn} onClick={() => signOut()}>
            Logout
        </span>
    )
}

const Logo = () => {
    return (
        <div className={styles.logoContainer}>
            <div className={styles.logoImageContainer}>
                <Image src="/logo.jpg" width={200} height={200} />
            </div>
            <p className={styles.logoText}>Outfitted</p>
        </div>
    );
};

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const [session, loading] = useSession();

    return (
        <div className={styles.container}>
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
                    {session &&
                        <li className={styles.greetingContainer}>
                            {session.user.name}
                        </li>}

                    {/* Show if the user isn't logged in */}
                    {(!session && !loading) && <li><LoginButton />
                    </li>}
                    {session &&
                        <li className={styles.closetLink}>
                            <Link href="/closet">
                                Closet
                            </Link>
                        </li>
                    }
                    <li>
                        <Button ref={btnRef} size="sm" color="black" fontSize="1.6rem" colorScheme="none" onClick={onOpen}>
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
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Logo />
                        </DrawerHeader>

                        <DrawerBody>
                            <ul className={styles.drawerLinks}>
                                <li>
                                    <Link passHref href="/">
                                        <a className={styles.link}><span className={styles.icon}><FaHome /></span>Home</a>
                                    </Link>
                                </li>
                                {session &&
                                    <>
                                        <li>
                                            <Link passHref href="/preferences">
                                                <a className={styles.link}><span className={styles.icon}><IoMdSettings /></span>Preferences</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link passHref href="/newsletter">
                                                <a className={styles.link}><span className={styles.icon}><FaRegNewspaper /></span>Newsletter</a>
                                            </Link>
                                        </li>
                                        <Divider/>
                                        <li>
                                            <Link passHref href="/admin/create_article">
                                                <a className={styles.link}><span className={styles.icon}><BsFileEarmarkPlus /></span>Create Article</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link passHref href="/admin/create_item">
                                                <a className={styles.link}><span className={styles.icon}><BsPlusCircle /></span>Create Item</a>
                                            </Link>
                                        </li>
                                        <Divider/>
                                        <li>
                                            <LogoutButton />
                                        </li>
                                    </>}
                            </ul>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    );
};

export default Header;