import React, { useState, useRef, useEffect } from "react";
import { Send, ShoppingCart, X, Loader } from "lucide-react";
import io from "socket.io-client";

// Beispiel für Socket.IO-Integration für Echtzeit-Kommunikation (wenn gewünscht)
// const socket = io("http://localhost:5000");

const HardwareShopBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [products, setProducts] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchInitialData();
        // Optional: Echtzeitnachrichten-Handling hinzufügen
        // socket.on("newMessage", (message) => setMessages((prev) => [...prev, message]));
        return () => {
            // socket.off("newMessage");
        };
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await fetch("/api/products/featured");
            const featuredProducts = await response.json();
            setProducts(featuredProducts);
            handleInitialMessage();
        } catch (error) {
            console.error("Fehler beim Laden der initialen Daten:", error);
        }
    };

    const handleInitialMessage = () => {
        setMessages([
            {
                text: "Willkommen! Ich bin Ihr Hardware-Berater. Wie kann ich Ihnen helfen?",
                sender: "bot",
            },
        ]);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const processMessage = async (userInput) => {
        setLoading(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userInput,
                    context: messages.slice(-5),
                }),
            });
            if (!response.ok) throw new Error("Netzwerkfehler");
            return await response.json();
        } catch (error) {
            console.error("Fehler:", error);
            return {
                text: "Es gab ein technisches Problem. Versuchen Sie es später erneut.",
                products: [],
            };
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (query) => {
        try {
            const response = await fetch(
                `/api/products/search?q=${encodeURIComponent(query)}`
            );
            return await response.json();
        } catch (error) {
            console.error("Fehler bei der Produktsuche:", error);
            return [];
        }
    };

    const addToCart = async (product) => {
        try {
            await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id }),
            });
            setCart((prev) => [...prev, product]);
            setMessages((prev) => [
                ...prev,
                {
                    text: `${product.name} wurde zum Warenkorb hinzugefügt.`,
                    sender: "bot",
                },
            ]);
        } catch (error) {
            console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Das Produkt konnte nicht zum Warenkorb hinzugefügt werden.",
                    sender: "bot",
                },
            ]);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await fetch(`/api/cart/${productId}`, { method: "DELETE" });
            setCart((prev) => prev.filter((item) => item._id !== productId));
        } catch (error) {
            console.error("Fehler beim Entfernen aus dem Warenkorb:", error);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        const aiResponse = await processMessage(input);

        if (aiResponse.searchProducts) {
            const products = await searchProducts(aiResponse.searchQuery);
            aiResponse.products = products;
        }

        setMessages((prev) => [
            ...prev,
            {
                text: aiResponse.text,
                sender: "bot",
                products: aiResponse.products,
            },
        ]);
    };

    const ProductCard = ({ product }) => (
        <div className="border rounded-lg p-4 mb-2 bg-white">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <div className="text-xs text-gray-500">
                        {Object.entries(product.specs || {}).map(
                            ([key, value]) => (
                                <div key={key}>
                                    {key}: {value}
                                </div>
                            )
                        )}
                    </div>
                    <p className="text-lg font-bold mt-2">
                        {product.price.toFixed(2)} €
                    </p>
                    <p className="text-sm text-gray-600">
                        Verfügbar: {product.stock} Stück
                    </p>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded ${
                        product.stock === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                >
                    <ShoppingCart className="w-5 h-5" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="chatbot-container">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="chatbot-toggle"
                >
                    {isOpen ? <X /> : <ShoppingCart />}
                </button>
                {isOpen && (
                    <div className="chatbot-content">
                        <div className="message-list">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender}`}
                                >
                                    {msg.text}
                                    {msg.products &&
                                        msg.products.map((product) => (
                                            <ProductCard
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleSend()
                                }
                                placeholder="Nachricht eingeben..."
                            />
                            <button onClick={handleSend} disabled={loading}>
                                {loading ? <Loader /> : <Send />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HardwareShopBot;
