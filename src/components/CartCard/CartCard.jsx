import { useOutletContext } from "react-router";
import styles from "./CartCard.module.css";

const CartCard = ({ item }) => {
    const { setCart } = useOutletContext();

    const increment = () => {
        if (item.quantity === 99) {
            return;
        }

        setCart(prevCart =>
            prevCart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        )
    };

    const decrement = () => {
        if (item.quantity === 1) {
            return;
        }

        setCart(prevCart =>
            prevCart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
        )
    };

    const removeItem = () => {
        setCart(prevCart =>
            prevCart.filter(cartItem => cartItem.id !== item.id));
    }

    const pricePerAmount = () => {
        const price = item.price * item.quantity;
        return price.toFixed(2);
    }

    

    return (
        <article className={styles.cartCardContainer}>
            <div className={styles.leftSide}>
                <h3 className={styles.cardTitle}>{item.title}
                </h3>
                <p className={styles.price}>${item.price}</p>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.amount}>
                    <button
                        className={styles.decrement}
                        onClick={decrement}
                    >
                            -
                    </button>
                    <span className={styles.quantityIndicator}>{item.quantity}</span>
                    <button
                        className={styles.increment}
                        onClick={increment}>
                            +
                    </button>
                </div>
                <span className={styles.quantityPrice}>${pricePerAmount()}</span>
                <button 
                className={styles.remove}
                onClick={removeItem}
                >Remove</button>
            </div>
        </article>
    )


}

export default CartCard;
