import { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Shop.module.css";

const Shop = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((data) => {
                setData(data)
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading products...</p>
    if (error) return <p>Error loading catalog.</p>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shop Catalog</h1>
            <div className={styles.cards}>
                {data.map((item) => (
                    <Card
                        key={item.id}
                        product={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Shop;