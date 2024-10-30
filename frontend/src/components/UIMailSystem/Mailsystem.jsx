import React, { useState } from "react";
import { Mail, Send, Trash2, User, Package } from "lucide-react";
import "./MailSystem.css";

const MailSystem = () => {
    // Sample items data
    const items = {
        bike123: {
            title: "Vintage Fahrrad",
            price: "250€",
            description:
                "Gut erhaltenes Vintage-Rennrad aus den 80er Jahren. Stahlrahmen, Shimano-Komponenten.",
            condition: "Gut",
            location: "Berlin",
            image: "/api/placeholder/300/200",
        },
        lamp456: {
            title: "Retro Lampe",
            price: "45€",
            description:
                "Art Deco Tischlampe aus Messing, funktioniert einwandfrei.",
            condition: "Sehr gut",
            location: "Hamburg",
            image: "/api/placeholder/300/200",
        },
    };

    const [messages, setMessages] = useState([
        {
            id: 1,
            from: "verkäufer@example.com",
            subject: "Vintage Fahrrad",
            content: "Ist das Fahrrad noch verfügbar?",
            timestamp: "2024-10-29 10:30",
            read: true,
            itemId: "bike123",
        },
        {
            id: 2,
            from: "interessent@example.com",
            subject: "Retro Lampe",
            content: "Können Sie den Preis noch etwas reduzieren?",
            timestamp: "2024-10-29 09:15",
            read: false,
            itemId: "lamp456",
        },
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [newMessage, setNewMessage] = useState({
        to: "",
        subject: "",
        content: "",
        itemId: "",
    });
    const [view, setView] = useState("inbox");

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setMessages(
            messages.map((msg) =>
                msg.id === message.id ? { ...msg, read: true } : msg
            )
        );
    };

    const handleDelete = (messageId) => {
        setMessages(messages.filter((msg) => msg.id !== messageId));
        setSelectedMessage(null);
    };

    const handleSend = () => {
        const timestamp = new Date().toLocaleString();
        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                from: "ich@example.com",
                ...newMessage,
                timestamp,
                read: true,
            },
        ]);
        setNewMessage({ to: "", subject: "", content: "", itemId: "" });
        setView("inbox");
    };

    const ArticlePreview = ({ itemId }) => {
        const item = items[itemId];
        if (!item) return null;

        return (
            <div className="article-preview">
                <div className="article-header">
                    <Package size={20} />
                    <span>Artikel-Details</span>
                </div>
                <div className="article-content">
                    <img src={item.image} alt={item.title} />
                    <div className="article-info">
                        <h3>{item.title}</h3>
                        <p className="price">{item.price}</p>
                    </div>
                    <div className="article-details">
                        <p>{item.description}</p>
                        <div className="article-meta">
                            <span>Zustand: {item.condition}</span>
                            <span>Standort: {item.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mail-system">
            <div className="mail-container">
                <div className="mail-header">
                    <Mail size={24} />
                    <h2>Nachrichten-Center</h2>
                </div>
                <div className="mail-content">
                    {/* Linke Spalte - Nachrichtenliste */}
                    <div className="message-list">
                        <button
                            className="compose-button"
                            onClick={() => setView("compose")}
                        >
                            <Send size={16} />
                            <span>Neue Nachricht</span>
                        </button>

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                onClick={() => handleMessageClick(message)}
                                className={`message-item ${
                                    selectedMessage?.id === message.id
                                        ? "selected"
                                        : ""
                                } ${!message.read ? "unread" : ""}`}
                            >
                                <div className="message-header">
                                    <span className="from">{message.from}</span>
                                    <Trash2
                                        size={16}
                                        className="delete-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(message.id);
                                        }}
                                    />
                                </div>
                                <div className="subject">{message.subject}</div>
                                <div className="timestamp">
                                    {message.timestamp}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Rechte Spalte - Nachrichtendetails oder Compose */}
                    <div className="message-detail">
                        {view === "inbox" ? (
                            selectedMessage ? (
                                <div className="selected-message">
                                    <div className="sender-info">
                                        <User size={24} />
                                        <div>
                                            <div className="sender-name">
                                                {selectedMessage.from}
                                            </div>
                                            <div className="sender-time">
                                                {selectedMessage.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message-subject">
                                        Betreff: {selectedMessage.subject}
                                    </div>
                                    <div className="message-body">
                                        {selectedMessage.content}
                                    </div>
                                    <button
                                        className="reply-button"
                                        onClick={() => {
                                            setView("compose");
                                            setNewMessage({
                                                to: selectedMessage.from,
                                                subject: `Re: ${selectedMessage.subject}`,
                                                content: "",
                                                itemId: selectedMessage.itemId,
                                            });
                                        }}
                                    >
                                        Antworten
                                    </button>

                                    <ArticlePreview
                                        itemId={selectedMessage.itemId}
                                    />
                                </div>
                            ) : (
                                <div className="no-message">
                                    Wählen Sie eine Nachricht aus
                                </div>
                            )
                        ) : (
                            <div className="compose-form">
                                <input
                                    type="email"
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
                                <textarea
                                    placeholder="Nachricht"
                                    value={newMessage.content}
                                    onChange={(e) =>
                                        setNewMessage({
                                            ...newMessage,
                                            content: e.target.value,
                                        })
                                    }
                                />
                                <div className="button-group">
                                    <button
                                        className="send-button"
                                        onClick={handleSend}
                                    >
                                        Senden
                                    </button>
                                    <button
                                        className="cancel-button"
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
        </div>
    );
};

export default MailSystem;
