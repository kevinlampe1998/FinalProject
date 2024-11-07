import React, { useState, useEffect } from "react";
import "./NewInStore.css";

const NewInStore = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Daten laden, wenn Komponente gemountet wird
    useEffect(() => {
        fetchProducts();
    }, []);

    // Funktion zum Abrufen der Produktdaten
    const fetchProducts = async () => {
        setLoading(true);
        setError(null); // Fehler zurücksetzen
        try {
            const response = await fetch("/api/products/new");
            if (!response.ok)
                throw new Error("Daten konnten nicht geladen werden");
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <h1 className="rotating-welcome">
                Willkommen zu Neu im Sortiment!
            </h1>

            {loading && <div className="loading">Lädt...</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && products.length === 0 && (
                <div className="no-results">Keine neuen Produkte gefunden.</div>
            )}

            <section className="products-section">
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-header">
                                <h2 className="product-title">
                                    {product.name}
                                </h2>
                                <p className="product-manufacturer">
                                    {product.manufacturer}
                                </p>
                            </div>
                            <div className="product-content">
                                <p className="product-price">
                                    {product.price} €
                                </p>
                                <div className="product-specs">
                                    {product.specs.map((spec, index) => (
                                        <p key={index}>
                                            <span>{spec.label}:</span>{" "}
                                            {spec.value}
                                        </p>
                                    ))}
                                </div>
                                <button
                                    className="product-button"
                                    aria-label={`Mehr Details zu ${product.name}`}
                                >
                                    Details ansehen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default React.memo(NewInStore);
