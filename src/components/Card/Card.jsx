import { useOutletContext } from "react-router";
import { useState } from "react";
import styles from "./Card.module.css";

const Card = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { setCart } = useOutletContext();

    const increment = () => {
        if (quantity === 99) {
            return;
        }
        setQuantity(previousQuantity => previousQuantity + 1);
    }

    const decrement = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(previousQuantity => previousQuantity - 1);
    }

    const manualChange = (event) => {
        const value = event.target.value;

        if (value === "") {
            setQuantity("");
            return;
        }

        const number = Number(value);


        if (number < 1) {
            setQuantity(1)
            return;
        }

        if (number > 99) {
            setQuantity(99);
            return;
        }

        setQuantity(number);
    }

    const handleAddToCart = () => {
        setCart(prevCart => {

            const existingIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingIndex > -1) {
                const updatedCart = [...prevCart];

                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + quantity
                };

                return updatedCart;
            }

            return [...prevCart, { ...product, quantity }];
        });
    };

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.title} />
            </div>
            <h3 className={styles.category}>{product.category.toUpperCase()}</h3>
            <p className={styles.title}>{product.title}</p>
            <p className={styles.price}>${product.price}</p>

            <div className={styles.quantity}>
                <button
                    className={styles.decrease}
                    onClick={decrement}
                >-
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={manualChange}
                />
                <button
                    className={styles.increase}
                    onClick={increment}
                >
                    +
                </button>
            </div>
            <div className={styles.cartContainer}>
                <button
                    className={styles.addToCart}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </article>
    )
}

export default Card;

