import React, { useState, useRef, useEffect } from "react";
import { Send, ShoppingCart, X, Loader } from "lucide-react";

// Beispiel-Produktdatenbank (In Produktion würde dies aus Ihrer tatsächlichen DB kommen)
const PRODUCTS_DB = {
    graphics_cards: [
        {
            id: 1,
            name: "RTX 4090",
            price: 1599.99,
            category: "GPU",
            stock: 5,
            specs: "24GB GDDR6X, 2.5GHz",
        },
        {
            id: 2,
            name: "RTX 4080",
            price: 1199.99,
            category: "GPU",
            stock: 8,
            specs: "16GB GDDR6X, 2.4GHz",
        },
    ],
    processors: [
        {
            id: 3,
            name: "Ryzen 9 7950X",
            price: 699.99,
            category: "CPU",
            stock: 12,
            specs: "16 Cores, 32 Threads",
        },
        {
            id: 4,
            name: "Core i9-14900K",
            price: 589.99,
            category: "CPU",
            stock: 15,
            specs: "24 Cores, 32 Threads",
        },
    ],
    motherboards: [
        {
            id: 5,
            name: "ROG X670E",
            price: 499.99,
            category: "Mainboard",
            stock: 10,
            specs: "AM5, DDR5",
        },
        {
            id: 6,
            name: "MSI Z790",
            price: 449.99,
            category: "Mainboard",
            stock: 7,
            specs: "LGA1700, DDR5",
        },
    ],
};

const HardwareShopBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messages.length === 0) {
            handleInitialMessage();
        }
    }, []);

    const handleInitialMessage = async () => {
        const welcomeMessage = {
            text: "Willkommen! Ich bin Ihr Hardware-Berater. Ich kann Ihnen helfen bei:\n• Produktempfehlungen\n• Technischen Fragen\n• Kompatibilitätsprüfungen\n• Preisvergleichen\nWie kann ich Ihnen helfen?",
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

    // OpenAI API Aufruf simuliert (In Produktion würde dies über Ihren Server laufen)
    const getAIResponse = async (userInput) => {
        setLoading(true);
        try {
            // Simulierte API-Verzögerung
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Beispiel für einen OpenAI API Prompt
            const prompt = `
        Kontext: Du bist ein Hardware-Experte in einem Computer Shop.
        Aktuelle Produkte: ${JSON.stringify(PRODUCTS_DB)}
        Kundenanfrage: ${userInput}
        
        Aufgabe: Analysiere die Anfrage und:
        1. Identifiziere die Art der Anfrage (Beratung/Suche/Support)
        2. Bei Produktsuche: Finde passende Produkte
        3. Bei Beratung: Gib eine fundierte Empfehlung
        4. Bei technischen Fragen: Erkläre verständlich
        
        Antworte im Kundenservice-Stil.
      `;

            // Hier würde normalerweise der tatsächliche OpenAI API Call stehen
            // const response = await openai.createCompletion({...});

            // Simulierte AI-Antwort basierend auf Keywords
            let response = "";
            let products = [];

            if (userInput.toLowerCase().includes("grafikkarte")) {
                response =
                    "Basierend auf Ihrer Anfrage empfehle ich Ihnen folgende Grafikkarten:";
                products = PRODUCTS_DB.graphics_cards;
            } else if (userInput.toLowerCase().includes("prozessor")) {
                response = "Hier sind unsere aktuellen Top-Prozessoren:";
                products = PRODUCTS_DB.processors;
            } else if (userInput.toLowerCase().includes("mainboard")) {
                response =
                    "Folgende Mainboards könnten für Sie interessant sein:";
                products = PRODUCTS_DB.motherboards;
            } else {
                response =
                    "Ich verstehe, dass Sie sich für Hardware interessieren. Können Sie mir genauer sagen, welche Komponente Sie suchen? Ich kenne mich mit Grafikkarten, Prozessoren und Mainboards besonders gut aus.";
            }

            return { text: response, products };
        } catch (error) {
            return {
                text: "Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es später noch einmal.",
                products: [],
            };
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
        setMessages([
            ...messages,
            {
                text: `${product.name} wurde zum Warenkorb hinzugefügt.`,
                sender: "bot",
            },
        ]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        const aiResponse = await getAIResponse(input);
        const botMessage = {
            text: aiResponse.text,
            sender: "bot",
            products: aiResponse.products,
        };
        setMessages((prev) => [...prev, botMessage]);
    };

    // Produktkarte Komponente
    const ProductCard = ({ product }) => (
        <div className="border rounded-lg p-4 mb-2 bg-white">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-xs text-gray-500">{product.specs}</p>
                    <p className="text-lg font-bold mt-2">
                        {product.price.toFixed(2)} €
                    </p>
                    <p className="text-sm text-gray-600">
                        Verfügbar: {product.stock} Stück
                    </p>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    <ShoppingCart className="w-5 h-5" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
            >
                {isOpen ? <X /> : "Hardware Berater"}
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 h-[600px] bg-gray-50 rounded-lg shadow-xl flex flex-col">
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold">Hardware Berater</h3>
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="p-2 hover:bg-blue-700 rounded-full relative"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {showCart ? (
                            <div className="p-4">
                                <h4 className="font-bold mb-4">Warenkorb</h4>
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center border-b py-2"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {item.price.toFixed(2)} €
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <p className="text-gray-500 text-center">
                                        Ihr Warenkorb ist leer
                                    </p>
                                )}
                                {cart.length > 0 && (
                                    <div className="mt-4">
                                        <div className="flex justify-between font-bold">
                                            <span>Gesamt:</span>
                                            <span>
                                                {cart
                                                    .reduce(
                                                        (sum, item) =>
                                                            sum + item.price,
                                                        0
                                                    )
                                                    .toFixed(2)}{" "}
                                                €
                                            </span>
                                        </div>
                                        <button className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600">
                                            Zur Kasse
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">
                                {messages.map((message, index) => (
                                    <div key={index}>
                                        <div
                                            className={`flex ${
                                                message.sender === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${
                                                    message.sender === "user"
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-white text-gray-800"
                                                }`}
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                        {message.products &&
                                            message.products.map((product) => (
                                                <ProductCard
                                                    key={product.id}
                                                    product={product}
                                                />
                                            ))}
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-center">
                                        <Loader className="w-6 h-6 animate-spin text-blue-600" />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {!showCart && (
                        <div className="p-4 bg-white border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSend()
                                    }
                                    placeholder="Fragen Sie nach Produkten oder Beratung..."
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                    disabled={loading}
                                />
                                <button
                                    onClick={handleSend}
                                    className={`p-2 rounded-lg ${
                                        loading || !input.trim()
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                    disabled={loading || !input.trim()}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HardwareShopBot;
