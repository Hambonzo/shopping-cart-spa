import styles from "./Home.module.css";
import { Link } from "react-router";

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>A store for sourcing your tech needs</h1>
            <p>Please look at our catalogue of clothing, hardrives, jewlery and monitors!</p>
            <button><Link to="shop">Shop Now</Link> </button>
        </div>
    );
};

export default Home;