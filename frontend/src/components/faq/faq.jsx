import { useState } from "react";

// Beispiel-Daten für die FAQs
const faqs = [
    {
        question: "Wie lange dauert der Versand?",
        answer: "Der Versand dauert in der Regel 3-5 Werktage.",
    },
    {
        question: "Wie kann ich meine Bestellung zurückgeben?",
        answer: "Um eine Rücksendung zu veranlassen, kontaktieren Sie bitte unseren Kundenservice.",
    },
    {
        question: "Welche Zahlungsmethoden akzeptiert Techoase?",
        answer: "Wir akzeptieren Kreditkarten, PayPal und Klarna.",
    },
    {
        question: "Bieten Sie internationale Lieferung an?",
        answer: "Ja, wir liefern weltweit. Die Versandkosten variieren je nach Destination.",
    },
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={toggleAnswer}>
                <h3>{question}</h3>
                <span>{isOpen ? "-" : "+"}</span>
            </div>
            {isOpen && (
                <div className="faq-answer">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQPage = () => {
    return (
        <div className="faq-page">
            <h1>Häufig gestellte Fragen (FAQ)</h1>
            {faqs.map((faq, index) => (
                <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
        </div>
    );
};

export default FAQPage;
