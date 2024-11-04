import React, { useEffect, useState, useContext } from "react";
import { Mail, Send, Trash2, User, Package } from "lucide-react";
import "./MailSystem.css";
import { useParams } from "react-router-dom";
import { TheContext } from '../../App.jsx';

const MailSystem = () => {
    const param = useParams();
    const { localDataBank, dispatch } = useContext(TheContext);
    // const [items, setItems] = useState([]);

    const fetchUsedItem = async () => {
        const res = await fetch(`http://localhost:3000/used-item/${param}`);
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        console.log(param);
        console.log(localDataBank.user._id);

        typeof param === 'string' && fetchUsedItem();

        const item = {

        };
    }, []);

    
    // Sample items data
    // const items = {
    //     bike123: {
    //         product_name: "Vintage Fahrrad",
    //         price: "250€",
    //         description:
    //             "Gut erhaltenes Vintage-Rennrad aus den 80er Jahren. Stahlrahmen, Shimano-Komponenten.",
    //         town: "Berlin",
    //         main_picture: "/api/placeholder/300/200",
    //     },
    //     lamp456: {
    //         product_name: "Retro Lampe",
    //         price: "45€",
    //         description:
    //             "Art Deco Tischlampe aus Messing, funktioniert einwandfrei.",
    //         town: "Hamburg",
    //         main_picture: "/api/placeholder/300/200",
    //     },
    // };

    // const [messages, setMessages] = useState([
    //     {
    //         user_id: 1,
    //         from: "verkäufer@example.com",
    //         product_name: "Vintage Fahrrad",
    //         content: "Ist das Fahrrad noch verfügbar?",
    //         timestamp: "2024-10-29 10:30",
    //         read: true,
    //         product_id: "bike123",
    //     },
    // ]);

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

    // const ArticlePreview = ({ itemId }) => {
    //     const item = items[itemId];
        // if (!item) return null;

    //     return (
    //         <div className="article-preview">
    //             <div className="article-header">
    //                 <Package size={20} />
    //                 <span>Artikel-Details</span>
    //             </div>
    //             <div className="article-content">
    //                 <img src={item.image} alt={item.title} />
    //                 <div className="article-info">
    //                     <h3>{item.title}</h3>
    //                     <p className="price">{item.price}</p>
    //                 </div>
    //                 <div className="article-details">
    //                     <p>{item.description}</p>
    //                     <div className="article-meta">
    //                         <span>Standort: {item.location}</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <div className="mail-system">
            Mail System
        </div>
    );
};

export default MailSystem;

            // <div className="mail-container">
            //     <div className="mail-header">
            //         <Mail size={24} />
            //         <h2>Nachrichten-Center</h2>
            //     </div>
            //     <div className="mail-content">
            //         {/* Linke Spalte - Nachrichtenliste */}
            //         <div className="message-list">
            //             <button
            //                 className="compose-button"
            //                 // onClick={() => setView("compose")}
            //             >
            //                 <Send size={16} />
            //                 <span>Neue Nachricht</span>
            //             </button>

            //             {messages.map((message) => (
            //                 <div
            //                     key={message.id}
            //                     onClick={() => handleMessageClick(message)}
            //                     className={`message-item ${
            //                         selectedMessage?.id === message.id
            //                             ? "selected"
            //                             : ""
            //                     } ${!message.read ? "unread" : ""}`}
            //                 >
            //                     <div className="message-header">
            //                         <span className="from">{message.from}</span>
            //                         <Trash2
            //                             size={16}
            //                             className="delete-icon"
            //                             onClick={(e) => {
            //                                 e.stopPropagation();
            //                                 handleDelete(message.id);
            //                             }}
            //                         />
            //                     </div>
            //                     <div className="subject">{message.subject}</div>
            //                     <div className="timestamp">
            //                         {message.timestamp}
            //                     </div>
            //                 </div>
            //             ))}
            //         </div>

            //         <div className="message-detail">
            //             {view === "inbox" ? (
            //                 selectedMessage ? (
            //                     <div className="selected-message">
            //                         <div className="sender-info">
            //                             <User size={24} />
            //                             <div>
            //                                 <div className="sender-name">
            //                                     {selectedMessage.from}
            //                                 </div>
            //                                 <div className="sender-time">
            //                                     {selectedMessage.timestamp}
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div className="message-subject">
            //                             Betreff: {selectedMessage.subject}
            //                         </div>
            //                         <div className="message-body">
            //                             {selectedMessage.content}
            //                         </div>
            //                         <button
            //                             className="reply-button"
            //                             onClick={() => {
            //                                 setView("compose");
            //                                 setNewMessage({
            //                                     to: selectedMessage.from,
            //                                     subject: `Re: ${selectedMessage.subject}`,
            //                                     content: "",
            //                                     itemId: selectedMessage.itemId,
            //                                 });
            //                             }}
            //                         >
            //                             Antworten
            //                         </button>

            //                         <ArticlePreview
            //                             itemId={selectedMessage.itemId}
            //                         />
            //                     </div>
            //                 ) : (
            //                     <div className="no-message">
            //                         Wählen Sie eine Nachricht aus
            //                     </div>
            //                 )
            //             ) : (
            //                 <div className="compose-form">
            //                     <input
            //                         type="email"
            //                         placeholder="An:"
            //                         value={newMessage.to}
            //                         onChange={(e) =>
            //                             setNewMessage({
            //                                 ...newMessage,
            //                                 to: e.target.value,
            //                             })
            //                         }
            //                     />
            //                     <input
            //                         type="text"
            //                         placeholder="Betreff:"
            //                         value={newMessage.subject}
            //                         onChange={(e) =>
            //                             setNewMessage({
            //                                 ...newMessage,
            //                                 subject: e.target.value,
            //                             })
            //                         }
            //                     />
            //                     <textarea
            //                         placeholder="Nachricht"
            //                         value={newMessage.content}
            //                         onChange={(e) =>
            //                             setNewMessage({
            //                                 ...newMessage,
            //                                 content: e.target.value,
            //                             })
            //                         }
            //                     />
            //                     <div className="button-group">
            //                         <button
            //                             className="send-button"
            //                             onClick={handleSend}
            //                         >
            //                             Senden
            //                         </button>
            //                         <button
            //                             className="cancel-button"
            //                             onClick={() => setView("inbox")}
            //                         >
            //                             Abbrechen
            //                         </button>
            //                     </div>
            //                 </div>
            //             )}
            //         </div>
            //     </div>
            // </div>