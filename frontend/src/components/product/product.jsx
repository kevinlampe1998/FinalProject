import React, { useState, useEffect } from "react";
import Product from "../models/product"; // Annahme: Model oder Datenquelle für Produkte
import "./product.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Daten laden, wenn Komponente gemountet wird
    useEffect(() => {
        fetchProducts();
    }, []);

    // Funktion zum Abrufen der Produktdaten
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/products?query=${query}`);
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

    // Funktion zum Löschen eines Produkts
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });
            if (!response.ok)
                throw new Error("Produkt konnte nicht gelöscht werden");
            setProducts(products.filter((product) => product._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    // Handler für die Suche
    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <div className="home">
            <section className="search-section">
                <form className="search-form" onSubmit={handleSearch}>
                    <div className="search-input-container">
                        <span className="search-icon" aria-hidden="true">
                            🔍
                        </span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Suche nach Produktname oder Hersteller"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Produktsuche"
                        />
                    </div>
                    <button type="submit" className="search-button">
                        Suchen
                    </button>
                </form>
            </section>

            {loading && <div className="loading">Lädt...</div>}
            {error && <div className="error-message">{error}</div>}
            {!loading && !error && products.length === 0 && (
                <div className="no-results">Keine Ergebnisse gefunden.</div>
            )}

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="manufacturer">
                                {product.manufacturer}
                            </p>
                            <p className="price">{product.price} €</p>
                            <div className="specs">
                                <p>{product.specs}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteProduct(product._id)}
                            className="delete-button"
                            aria-label={`Produkt ${product.name} löschen`}
                        >
                            Löschen
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(ProductPage);
