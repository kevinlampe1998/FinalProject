import React, { useState, useEffect } from "react";
import { Mail, Send, Trash2, User, Package } from "lucide-react";
import io from "socket.io-client";
import "./MessageCenter.css";

const socket = io("http://localhost:5000"); // Verbinde zum Socket.IO-Server

const MessageCenter = ({ currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [view, setView] = useState("inbox");
    const [newMessageContent, setNewMessageContent] = useState("");

    // Nachrichten beim Mounten laden
    useEffect(() => {
        fetchMessages();
        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("/api/messages");
            const data = await response.json();
            setMessages(
                data.filter(
                    (message) =>
                        message.senderId === currentUser.id ||
                        message.receiverId === currentUser.id
                )
            );
        } catch (error) {
            console.error("Fehler beim Laden der Nachrichten:", error);
        }
    };

    const sendMessage = async () => {
        const message = {
            senderId: currentUser.id,
            receiverId: selectedMessage ? selectedMessage.receiverId : null, // Empfänger wählen
            content: newMessageContent,
            timestamp: new Date().toISOString(),
        };

        try {
            await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });

            socket.emit("sendMessage", message); // Nachricht über Socket senden
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessageContent(""); // Eingabefeld leeren
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await fetch(`/api/messages/${messageId}`, { method: "DELETE" });
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.id !== messageId)
            );
        } catch (error) {
            console.error("Fehler beim Löschen der Nachricht:", error);
        }
    };

    return (
        <div className="message-center">
            <div className="message-header">
                <h2>Nachrichten-Center</h2>
                <button onClick={() => setView("inbox")}>
                    <Mail /> Eingang
                </button>
                <button onClick={() => setView("sent")}>
                    <Send /> Gesendet
                </button>
            </div>

            <div className="message-list">
                {view === "inbox" &&
                    messages
                        .filter((msg) => msg.receiverId === currentUser.id)
                        .map((msg) => (
                            <div
                                key={msg.id}
                                className="message-item"
                                onClick={() => setSelectedMessage(msg)}
                            >
                                <User /> Von: {msg.senderId}
                                <p>{msg.content}</p>
                                <Trash2
                                    onClick={() => handleDeleteMessage(msg.id)}
                                />
                            </div>
                        ))}
                {view === "sent" &&
                    messages
                        .filter((msg) => msg.senderId === currentUser.id)
                        .map((msg) => (
                            <div
                                key={msg.id}
                                className="message-item"
                                onClick={() => setSelectedMessage(msg)}
                            >
                                <User /> An: {msg.receiverId}
                                <p>{msg.content}</p>
                                <Trash2
                                    onClick={() => handleDeleteMessage(msg.id)}
                                />
                            </div>
                        ))}
            </div>

            {selectedMessage && (
                <div className="message-detail">
                    <h3>Nachricht von {selectedMessage.senderId}</h3>
                    <p>{selectedMessage.content}</p>
                    <small>
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                    </small>
                </div>
            )}

            <div className="new-message">
                <textarea
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    placeholder="Schreibe eine Nachricht..."
                />
                <button onClick={sendMessage}>
                    <Send /> Senden
                </button>
            </div>
        </div>
    );
};

export default MessageCenter;
