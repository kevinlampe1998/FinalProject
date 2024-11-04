import React, { useState, useRef, useEffect } from "react";
import { Send, ShoppingCart, X, Loader } from "lucide-react";

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
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await fetch("/api/products/featured");
            const featuredProducts = await response.json();
            setProducts(featuredProducts);

            handleInitialMessage();
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    const handleInitialMessage = () => {
        const welcomeMessage = {
            text: "Willkommen! Ich bin Ihr Hardware-Berater. Wie kann ich Ihnen helfen?",
            sender: "bot",
        };
        setMessages([welcomeMessage]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const processMessage = async (userInput) => {
        setLoading(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userInput,
                    context: messages.slice(-5), // Send last 5 messages for context
                }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error:", error);
            return {
                text: "Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es später noch einmal.",
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
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error searching products:", error);
            return [];
        }
    };

    const addToCart = async (product) => {
        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: product._id }),
            });

            if (!response.ok) throw new Error("Failed to add to cart");

            setCart([...cart, product]);
            setMessages((prev) => [
                ...prev,
                {
                    text: `${product.name} wurde zum Warenkorb hinzugefügt.`,
                    sender: "bot",
                },
            ]);
        } catch (error) {
            console.error("Error adding to cart:", error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Entschuldigung, das Produkt konnte nicht zum Warenkorb hinzugefügt werden.",
                    sender: "bot",
                },
            ]);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(`/api/cart/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to remove from cart");

            setCart(cart.filter((item) => item._id !== productId));
        } catch (error) {
            console.error("Error removing from cart:", error);
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

    // Rest des UI-Codes bleibt größtenteils gleich...
    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* ... bisheriger UI-Code ... */}
        </div>
    );
};

export default HardwareShopBot;
