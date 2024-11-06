import { useEffect, useState } from "react";
import "./product.css";
import ThreeDExample from "../ThreeDExample/ThreeDExample";
import { Search } from "lucide-react";

const product = () => {
    const [customerName, setCustomerName] = useState("Guest");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Suchfunktion für MongoDB
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/products/search?query=${searchQuery}`
            );
            if (!response.ok) {
                throw new Error("Fehler bei der Suche");
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError("Fehler beim Laden der Produkte: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="home">
            <p className="rotating-welcome">Welcome {customerName}</p>
            <h1>Welcome to Tech Oase</h1>
            <ThreeDExample />

            {/* Suchformular */}
            <div className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-container">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Suche nach Laptops..."
                            className="search-input"
                        />
                    </div>
                    <button type="submit" className="search-button">
                        Suchen
                    </button>
                </form>
            </div>

            {/* Loading und Error States */}
            {loading && <div className="loading">Suche Produkte...</div>}
            {error && <div className="error-message">{error}</div>}

            {/* Produktanzeige */}
            {products.length > 0 && (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-info">
                                <h3>{product.modell}</h3>
                                <p className="manufacturer">
                                    {product.hersteller}
                                </p>
                                <p className="price">
                                    {product.preis.toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </p>
                                <div className="specs">
                                    <p>
                                        <strong>CPU:</strong>{" "}
                                        {product.spezifikationen.prozessor.name}
                                    </p>
                                    <p>
                                        <strong>RAM:</strong>{" "}
                                        {
                                            product.spezifikationen
                                                .arbeitsspeicher.groesse
                                        }
                                        GB{" "}
                                        {
                                            product.spezifikationen
                                                .arbeitsspeicher.typ
                                        }
                                    </p>
                                    <p>
                                        <strong>Display:</strong>{" "}
                                        {
                                            product.spezifikationen.bildschirm
                                                .groesse
                                        }
                                        "{" "}
                                        {product.spezifikationen.bildschirm.typ}
                                    </p>
                                    {product.spezifikationen.grafik && (
                                        <p>
                                            <strong>GPU:</strong>{" "}
                                            {
                                                product.spezifikationen.grafik
                                                    .name
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Keine Ergebnisse */}
            {!loading && products.length === 0 && searchQuery && (
                <div className="no-results">Keine Produkte gefunden</div>
            )}
        </section>
    );
};

export default product;
