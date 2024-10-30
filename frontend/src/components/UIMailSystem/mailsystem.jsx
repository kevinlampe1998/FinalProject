import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, Trash2, User } from "lucide-react";

const MailSystem = () => {
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
    });
    const [view, setView] = useState("inbox"); // 'inbox' oder 'compose'

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        // Markiere Nachricht als gelesen
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
        setNewMessage({ to: "", subject: "", content: "" });
        setView("inbox");
    };

    return (
        <div className="flex flex-col space-y-4 w-full max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Mail className="w-6 h-6" />
                        <span>Nachrichten-Center</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4">
                        {/* Linke Spalte - Nachrichtenliste */}
                        <div className="w-1/3 border-r pr-4">
                            <button
                                onClick={() => setView("compose")}
                                className="w-full mb-4 flex items-center justify-center space-x-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                <Send className="w-4 h-4" />
                                <span>Neue Nachricht</span>
                            </button>

                            <div className="space-y-2">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        onClick={() =>
                                            handleMessageClick(message)
                                        }
                                        className={`p-2 rounded cursor-pointer ${
                                            selectedMessage?.id === message.id
                                                ? "bg-blue-100"
                                                : "hover:bg-gray-100"
                                        } ${!message.read ? "font-bold" : ""}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">
                                                {message.from}
                                            </span>
                                            <Trash2
                                                className="w-4 h-4 text-gray-400 hover:text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(message.id);
                                                }}
                                            />
                                        </div>
                                        <div className="text-sm font-medium">
                                            {message.subject}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {message.timestamp}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rechte Spalte - Nachrichtendetails oder Compose */}
                        <div className="w-2/3">
                            {view === "inbox" ? (
                                selectedMessage ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-6 h-6" />
                                            <div>
                                                <div className="font-medium">
                                                    {selectedMessage.from}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {selectedMessage.timestamp}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="font-medium">
                                            Betreff: {selectedMessage.subject}
                                        </div>
                                        <div className="text-gray-700">
                                            {selectedMessage.content}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setView("compose");
                                                setNewMessage({
                                                    to: selectedMessage.from,
                                                    subject: `Re: ${selectedMessage.subject}`,
                                                    content: "",
                                                });
                                            }}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Antworten
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500">
                                        Wählen Sie eine Nachricht aus
                                    </div>
                                )
                            ) : (
                                <div className="space-y-4">
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
                                        className="w-full p-2 border rounded"
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
                                        className="w-full p-2 border rounded"
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
                                        className="w-full p-2 border rounded h-40"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSend}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Senden
                                        </button>
                                        <button
                                            onClick={() => setView("inbox")}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        >
                                            Abbrechen
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MailSystem;
