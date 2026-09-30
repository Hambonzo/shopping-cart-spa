import styles from "./Header.module.css";
import { Link } from "react-router";

const Header = ({ cart }) => {

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header>
            <div className={styles.container}>
                <h1 className={styles.title}>Bonzo's Boutique</h1>
                <nav className="navBar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="shop">Shop</Link>
                        </li>
                        <li>
                            <Link to="cart">Cart <span className={styles.cartAmount}>{totalItems}</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;