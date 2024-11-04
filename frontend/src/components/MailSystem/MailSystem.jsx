/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState, useContext } from "react";
import { Mail, Send, Trash2, User, Package } from "lucide-react";
import "./MailSystem.css";
import { useParams } from "react-router-dom";
import { TheContext } from "../../App.jsx";

const MailSystem = () => {
    /* eslint-disable no-unused-vars */
    const param = useParams();
    const { localDataBank, dispatch } = useContext(TheContext);
    /* eslint-disable no-unused-vars */

    const fetchUsedItem = async () => {
        /* eslint-disable no-unused-vars */
        const res = await fetch(`http://localhost:3000/used-item/${param}`);
        const data = await res.json();
        console.log(data);
        /* eslint-enable no-unused-vars */
    };

    useEffect(() => {
        console.log(param);
        console.log(localDataBank.user._id);
        typeof param === "string" && fetchUsedItem();
        /* eslint-disable no-unused-vars */
        const item = {};
        /* eslint-enable no-unused-vars */
    }, []);

    /* eslint-disable no-unused-vars */
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
    /* eslint-enable no-unused-vars */
};

export default MailSystem;
