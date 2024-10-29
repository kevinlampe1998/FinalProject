import React, { useState } from "react";

const Section = ({ title, children, isOpen, onClick }) => (
    <div className="border-b border-gray-200">
        <button
            onClick={onClick}
            className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50"
        >
            <span className="text-lg font-semibold">{title}</span>
            <span
                className="transform transition-transform duration-200"
                style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
            >
                ▼
            </span>
        </button>
        {isOpen && <div className="px-6 pb-4">{children}</div>}
    </div>
);

const TechOaseTerms = () => {
    const [openSection, setOpenSection] = useState("1");

    const sections = [
        {
            id: "1",
            title: "1. Allgemeine Bestimmungen",
            content: (
                <div className="space-y-4">
                    <p>
                        Willkommen bei TechOase.com. Diese Allgemeinen
                        Geschäftsbedingungen regeln die Nutzung unserer Website
                        sowie den Kauf von Produkten über unseren Online-Shop.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Betreiber: TechOase GmbH, Musterstraße 123, 12345
                            Berlin
                        </li>
                        <li>
                            Handelsregister: HRB 12345 B, Amtsgericht Berlin
                        </li>
                        <li>USt-IdNr.: DE123456789</li>
                        <li>Geschäftsführung: Max Mustermann</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "2",
            title: "2. Vertragsschluss",
            content: (
                <div className="space-y-4">
                    <p>Der Kaufvertrag kommt zustande durch:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Ihre Bestellung (Angebot)</li>
                        <li>Unsere Bestellbestätigung per E-Mail (Annahme)</li>
                        <li>Bei Vorkasse: Nach Eingang Ihrer Zahlung</li>
                        <li>
                            Bei PayPal/Kreditkarte: Nach erfolgreicher
                            Zahlungsbestätigung
                        </li>
                    </ul>
                    <p className="mt-4">
                        Die Darstellung der Produkte im Online-Shop stellt kein
                        rechtlich bindendes Angebot, sondern einen
                        unverbindlichen Online-Katalog dar.
                    </p>
                </div>
            ),
        },
        {
            id: "3",
            title: "3. Preise und Zahlungsbedingungen",
            content: (
                <div className="space-y-4">
                    <p>Preise und Zahlungsoptionen:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Alle Preise in EUR inklusive gesetzlicher MwSt.</li>
                        <li>Versandkosten werden separat ausgewiesen</li>
                        <li>
                            Zahlungsmöglichkeiten:
                            <ul className="list-disc pl-6 mt-2">
                                <li>PayPal</li>
                                <li>Kreditkarte (Visa, Mastercard)</li>
                                <li>Sofortüberweisung</li>
                                <li>Vorkasse per Überweisung</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: "4",
            title: "4. Lieferung und Versand",
            content: (
                <div className="space-y-4">
                    <p>Versandbedingungen:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Lieferung innerhalb Deutschlands: 2-3 Werktage</li>
                        <li>EU-Lieferung: 3-5 Werktage</li>
                        <li>Versandkostenfreie Lieferung ab 50€ Bestellwert</li>
                        <li>Expresslieferung gegen Aufpreis möglich</li>
                    </ul>
                    <p className="mt-4">
                        Die Lieferung erfolgt durch DHL oder DPD. Ein
                        Tracking-Link wird nach Versand per E-Mail zugestellt.
                    </p>
                </div>
            ),
        },
        {
            id: "5",
            title: "5. Widerrufsrecht",
            content: (
                <div className="space-y-4">
                    <p className="font-medium">
                        Sie haben das Recht, binnen 14 Tagen ohne Angabe von
                        Gründen diesen Vertrag zu widerrufen.
                    </p>
                    <p>Die Widerrufsfrist beträgt:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>14 Tage ab Erhalt der Ware</li>
                        <li>
                            Bei digitalen Produkten: 14 Tage ab Vertragsschluss
                        </li>
                    </ul>
                    <p className="mt-4">Ausschluss des Widerrufsrechts:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Versiegelte Software nach Öffnung</li>
                        <li>Individuell konfigurierte Systeme</li>
                        <li>Digitale Produkte nach Download/Aktivierung</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "6",
            title: "6. Gewährleistung und Garantie",
            content: (
                <div className="space-y-4">
                    <p>Gewährleistungsrechte:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>24 Monate gesetzliche Gewährleistung</li>
                        <li>Bei gebrauchten Artikeln: 12 Monate</li>
                        <li>
                            Herstellergarantie zusätzlich zur gesetzlichen
                            Gewährleistung
                        </li>
                    </ul>
                    <p className="mt-4">Support und Service:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Technischer Support: Mo-Fr 9-18 Uhr</li>
                        <li>E-Mail: support@techoase.com</li>
                        <li>Hotline: +49 123 456789</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "7",
            title: "7. Datenschutz",
            content: (
                <div className="space-y-4">
                    <p>Wir verarbeiten Ihre Daten gemäß DSGVO:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Bestellabwicklung und Kundenservice</li>
                        <li>Newsletter (nur mit Einwilligung)</li>
                        <li>Zahlungsabwicklung</li>
                        <li>Produktempfehlungen</li>
                    </ul>
                    <p className="mt-4">Ihre Rechte:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Auskunftsrecht</li>
                        <li>Recht auf Löschung</li>
                        <li>Recht auf Datenübertragbarkeit</li>
                        <li>Widerspruchsrecht</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "8",
            title: "8. Technische Systeme",
            content: (
                <div className="space-y-4">
                    <p>Systemvoraussetzungen und technische Bedingungen:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Aktuelle Browser-Version empfohlen</li>
                        <li>JavaScript muss aktiviert sein</li>
                        <li>Cookies werden für Kernfunktionen benötigt</li>
                    </ul>
                    <p className="mt-4">Bei digitalen Produkten:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Download nach Zahlungseingang</li>
                        <li>Systemanforderungen beachten</li>
                        <li>Aktivierungscodes sind 24 Monate gültig</li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow">
            <div className="text-center py-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold">
                    Allgemeine Geschäftsbedingungen
                </h1>
                <h2 className="text-xl text-blue-600 mt-2">TechOase.com</h2>
                <p className="text-sm text-gray-500 mt-2">
                    Stand: 29. Oktober 2024
                </p>
            </div>

            <div className="h-[600px] overflow-y-auto">
                {sections.map((section) => (
                    <Section
                        key={section.id}
                        title={section.title}
                        isOpen={openSection === section.id}
                        onClick={() =>
                            setOpenSection(
                                openSection === section.id ? "" : section.id
                            )
                        }
                    >
                        {section.content}
                    </Section>
                ))}

                <div className="p-6 bg-gray-50">
                    <p className="text-sm text-gray-600">
                        Mit der Nutzung unserer Website und dem Kauf über
                        unseren Online-Shop erklären Sie sich mit diesen
                        Allgemeinen Geschäftsbedingungen einverstanden. TechOase
                        behält sich das Recht vor, diese AGB jederzeit zu
                        ändern. Die aktuelle Version ist stets auf unserer
                        Website einsehbar.
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                        Bei Fragen zu unseren AGB kontaktieren Sie uns bitte
                        unter: info@techoase.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TechOaseTerms;
