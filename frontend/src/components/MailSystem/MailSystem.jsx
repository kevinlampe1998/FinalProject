import React, { useState, useEffect } from "react";
import { Mail, Send, Trash2, User, Package } from "lucide-react";
import "./MailSystem.css";

const MailSystem = ({ currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [view, setView] = useState("inbox");
    const [newMessageContent, setNewMessageContent] = useState("");

    // Nachrichten beim Mounten laden
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("/api/messages");
            console.log(response);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Nachrichten:", error);
        }
    };

    const sendMessage = async () => {
        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: newMessageContent,
                    sender: currentUser,
                    receiver: "empfänger@example.com", // Beispiel-Empfänger
                }),
            });
            const newMessage = await response.json();
            setMessages([...messages, newMessage]);
            setNewMessageContent("");
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }
    };

    return (
        <div className="mail-system">
            {/* UI-Komponenten und Nachrichtenanzeige */}
            MailSystem
        </div>
    );
};

export default MailSystem;
