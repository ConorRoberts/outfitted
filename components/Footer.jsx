import React from "react";
import styles from "@styles/Footer.module.scss";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.socials}>
        <ul>
          <li>
            <a>
              <FaInstagram />
            </a>
          </li>
          <li>
            <a>
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </div>

      <div>
        <span className={styles.label}>
          <IoMdMail />
          Email Us:{" "}
        </span>
        theoutfittedapp@gmail.com
      </div>
      <div>
        <span className={styles.label}>Tel: </span>905-718-3845
      </div>
    </div>
  );
};

export default Footer;
