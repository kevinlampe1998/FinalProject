import React, { useState, useEffect } from "react";
import { Mail, Send, Trash2, User, Package } from "lucide-react";

const MessageCenter = ({ currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [view, setView] = useState("inbox");
    const [usedItems, setUsedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [newMessage, setNewMessage] = useState({
        to: "",
        subject: "",
        content: "",
        itemId: "",
        from: currentUser?._id,
    });

    // Nachrichten laden
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("/api/message", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (data.messages) {
                    setMessages(
                        data.messages.filter(
                            (msg) =>
                                msg.to === currentUser._id ||
                                msg.from === currentUser._id
                        )
                    );
                }
            } catch (err) {
                console.error("Fehler beim Laden der Nachrichten:", err);
            }
        };

        if (currentUser) {
            fetchMessages();
        }
    }, [currentUser]);

    // UsedItems laden
    useEffect(() => {
        const fetchUsedItems = async () => {
            try {
                const response = await fetch("/used-items");
                const data = await response.json();
                if (data.products) {
                    setUsedItems(data.products);
                }
            } catch (err) {
                console.error("Fehler beim Laden der Artikel:", err);
            }
        };

        fetchUsedItems();
    }, []);

    const handleMessageClick = async (message) => {
        setSelectedMessage(message);

        // Artikel-Details laden
        if (message.itemId) {
            try {
                const response = await fetch(`/used-item/${message.itemId}`);
                const data = await response.json();
                if (data.product) {
                    setSelectedItem(data.product);
                }
            } catch (err) {
                console.error("Fehler beim Laden der Artikel-Details:", err);
            }
        }
    };

    const handleSend = async () => {
        try {
            const response = await fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMessage),
            });

            const data = await response.json();

            if (data.message === "Message successful saved!") {
                // Nachricht zur lokalen Liste hinzufügen
                setMessages((prev) => [
                    ...prev,
                    {
                        ...newMessage,
                        _id: Date.now(), // Temporäre ID
                        timestamp: new Date().toISOString(),
                    },
                ]);

                setNewMessage({
                    to: "",
                    subject: "",
                    content: "",
                    itemId: "",
                    from: currentUser?._id,
                });
                setView("inbox");
            }
        } catch (err) {
            console.error("Fehler beim Senden der Nachricht:", err);
        }
    };

    const handleDelete = async (messageId) => {
        try {
            const response = await fetch(`/api/message/${messageId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setMessages(messages.filter((msg) => msg._id !== messageId));
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error("Fehler beim Löschen der Nachricht:", err);
        }
    };

    const ArticlePreview = ({ item }) => {
        if (!item) return null;

        return (
            <div className="article-preview">
                <div className="article-header">
                    <Package size={20} />
                    <span>Artikel-Details</span>
                </div>
                <div className="article-content">
                    {item.main_picture && (
                        <img
                            src={item.main_picture.url}
                            alt={item.product_name}
                            className="product-image"
                        />
                    )}
                    <div className="article-info">
                        <h3>{item.product_name}</h3>
                        <p className="price">{item.price}€</p>
                    </div>
                    <div className="article-details">
                        <p>{item.description}</p>
                        <div className="article-meta">
                            <span>Verkäufer: {item.seller_name}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="message-center">
            <style>
                {`
          .message-center {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .message-container {
            display: flex;
            gap: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 20px;
          }
          
          .message-list {
            flex: 1;
            border-right: 1px solid #eee;
            padding-right: 20px;
          }
          
          .message-content {
            flex: 2;
          }
          
          .message-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
          }
          
          .message-item:hover {
            background: #f5f5f5;
          }
          
          .message-item.unread {
            font-weight: bold;
          }
          
          .compose-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .compose-form input,
          .compose-form textarea {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          
          .button-group {
            display: flex;
            gap: 10px;
          }
          
          .button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .primary-button {
            background: #007bff;
            color: white;
          }
          
          .product-image {
            width: 100%;
            max-width: 300px;
            height: auto;
            border-radius: 4px;
          }
          
          .article-preview {
            margin-top: 20px;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 15px;
          }
        `}
            </style>

            <h2>Nachrichten-Center</h2>
            <div className="message-container">
                <div className="message-list">
                    <button
                        className="button primary-button"
                        onClick={() => setView("compose")}
                    >
                        Neue Nachricht
                    </button>

                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`message-item ${
                                !message.read ? "unread" : ""
                            }`}
                            onClick={() => handleMessageClick(message)}
                        >
                            <div className="message-header">
                                <span>
                                    {message.from === currentUser._id
                                        ? `An: ${message.to}`
                                        : `Von: ${message.from}`}
                                </span>
                                <Trash2
                                    size={16}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(message._id);
                                    }}
                                />
                            </div>
                            <div>{message.subject}</div>
                            <div className="message-time">
                                {new Date(message.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="message-content">
                    {view === "inbox" ? (
                        selectedMessage ? (
                            <>
                                <div className="selected-message">
                                    <h3>{selectedMessage.subject}</h3>
                                    <div className="message-meta">
                                        <span>
                                            {selectedMessage.from ===
                                            currentUser._id
                                                ? "Gesendet an:"
                                                : "Von:"}{" "}
                                        </span>
                                        <span>
                                            {selectedMessage.from ===
                                            currentUser._id
                                                ? selectedMessage.to
                                                : selectedMessage.from}
                                        </span>
                                    </div>
                                    <div className="message-body">
                                        {selectedMessage.content}
                                    </div>
                                    <button
                                        className="button primary-button"
                                        onClick={() => {
                                            setView("compose");
                                            setNewMessage({
                                                to:
                                                    selectedMessage.from ===
                                                    currentUser._id
                                                        ? selectedMessage.to
                                                        : selectedMessage.from,
                                                subject: `Re: ${selectedMessage.subject}`,
                                                content: "",
                                                itemId: selectedMessage.itemId,
                                                from: currentUser._id,
                                            });
                                        }}
                                    >
                                        Antworten
                                    </button>
                                </div>
                                {selectedItem && (
                                    <ArticlePreview item={selectedItem} />
                                )}
                            </>
                        ) : (
                            <div>Wählen Sie eine Nachricht aus</div>
                        )
                    ) : (
                        <div className="compose-form">
                            <input
                                type="text"
                                placeholder="An:"
                                value={newMessage.to}
                                onChange={(e) =>
                                    setNewMessage({
                                        ...newMessage,
                                        to: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Betreff:"
                                value={newMessage.subject}
                                onChange={(e) =>
                                    setNewMessage({
                                        ...newMessage,
                                        subject: e.target.value,
                                    })
                                }
                            />
                            <select
                                value={newMessage.itemId}
                                onChange={(e) =>
                                    setNewMessage({
                                        ...newMessage,
                                        itemId: e.target.value,
                                    })
                                }
                            >
                                <option value="">Artikel auswählen</option>
                                {usedItems.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.product_name}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Nachricht"
                                value={newMessage.content}
                                onChange={(e) =>
                                    setNewMessage({
                                        ...newMessage,
                                        content: e.target.value,
                                    })
                                }
                                rows={6}
                            />
                            <div className="button-group">
                                <button
                                    className="button primary-button"
                                    onClick={handleSend}
                                >
                                    Senden
                                </button>
                                <button
                                    className="button"
                                    onClick={() => setView("inbox")}
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageCenter;