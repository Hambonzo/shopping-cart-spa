import styles from "./Layout.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import { useState } from "react";

const Layout = () => {
    const [cart, setCart] = useState([]);

    return (
        <div className={styles.layout}>
            <Header cart={cart}/>

            <main className={styles.main}>
                <Outlet context={{cart, setCart}} />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;