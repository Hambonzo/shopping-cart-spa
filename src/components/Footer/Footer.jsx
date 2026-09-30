import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contactUs}>
                <h3>Contact us</h3>
                <p>bonzoService@gmail.com</p>
                <p>0123456789</p>
            </div>
        </footer>
    )
}

export default Footer;