import styles from "./style.module.css";

const { footerContainer } = styles;

const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <div className={footerContainer}>
      © {currentYear} Silver Store. All rights reserved.
    </div>
  );
};

export default Footer;
