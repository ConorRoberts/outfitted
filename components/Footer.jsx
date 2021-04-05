import React from "react";
import styles from "@styles/Footer.module.scss";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
  FaTwitter,
  FaPhone,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.socials}>
        <li>
          <a href="https://www.instagram.com/theoutfittedapp/">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/theoutfittedapp/">
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/TheOutfittedApp">
            <FaTwitter />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/Theoutfittedapp-107446107674941">
            <FaFacebookF />
          </a>
        </li>
      </ul>

      <div>
        <span className={styles.icon}>
          <IoMdMail />
        </span>
        <p>
          <span className={styles.label}>Email Us: </span>
          theoutfittedapp@gmail.com
        </p>
      </div>
      <div>
        <span className={styles.icon}>
          <FaPhone />
        </span>
        <p>
          <span className={styles.label}>Tel: </span>905-718-3845
        </p>
      </div>
    </div>
  );
};

export default Footer;
