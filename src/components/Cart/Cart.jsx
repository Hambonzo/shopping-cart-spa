import styles from "./Cart.module.css";
import { useOutletContext } from "react-router";
import CartCard from "../CartCard/CartCard";
import { Link } from "react-router";

const Cart = () => {
    const { cart } = useOutletContext();

    const totalPrice = () => {
        return cart.reduce((sum, currentItem) => {
            return sum + currentItem.price * currentItem.quantity
        }, 0);
    }

    if (cart.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h1 className={styles.header}>Your Cart</h1>
                <div className={styles.emptyCartBox}>
                    <div className={styles.topHalf}>
                        <p>Your cart is empty.</p>
                    </div>
                    <div className={styles.bottomHalf}>
                        <Link to="/shop"
                        className={styles.toShop}>
                            Browse Shop
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Your Cart</h1>
                <div className={styles.cartCards}>
                    {cart.map((cartItem) => (
                        <CartCard
                            key={cartItem.id}
                            item={cartItem}
                        />
                    )
                    )}
                </div>
                <div className={styles.totalPrice}>Total: ${totalPrice()}</div>
            </div>
        )
    }


};

export default Cart;