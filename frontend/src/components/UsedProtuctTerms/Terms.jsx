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

const TermsAndConditions = () => {
    const [openSection, setOpenSection] = useState("1");

    const sections = [
        {
            id: "1",
            title: "1. General Terms",
            content: (
                <div className="space-y-4">
                    <p>
                        These Terms and Conditions govern the sale of used
                        products through our platform. By purchasing any used
                        product, you agree to be bound by these terms.
                    </p>
                    <p>
                        All used products are sold "as is" and "with all
                        faults," unless explicitly stated otherwise in the
                        product description.
                    </p>
                </div>
            ),
        },
        {
            id: "2",
            title: "2. Product Condition",
            content: (
                <div className="space-y-4">
                    <p>Each used product listing includes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Detailed description of the product's condition</li>
                        <li>Known defects or issues</li>
                        <li>Original accessories included</li>
                        <li>Age of the product (if known)</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "3",
            title: "3. Warranty and Returns",
            content: (
                <div className="space-y-4">
                    <p>
                        Used products come with a limited 30-day warranty
                        covering:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Basic functionality as described in the listing</li>
                        <li>
                            Undisclosed defects not mentioned in the listing
                        </li>
                    </ul>
                    <p className="font-medium mt-4">
                        Returns are accepted within 14 days if:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            The product significantly differs from its
                            description
                        </li>
                        <li>Undisclosed defects are discovered</li>
                        <li>The product arrives damaged</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "4",
            title: "4. Pricing and Payment",
            content: (
                <div className="space-y-4">
                    <p>All prices are final and include:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Product cost</li>
                        <li>Basic inspection and testing</li>
                        <li>Applicable taxes</li>
                    </ul>
                    <p>
                        Shipping costs are calculated separately based on your
                        location.
                    </p>
                </div>
            ),
        },
        {
            id: "5",
            title: "5. Shipping and Delivery",
            content: (
                <div className="space-y-4">
                    <p>All used products are:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Carefully packaged to prevent damage</li>
                        <li>Shipped with tracking information</li>
                        <li>Insured against loss or damage during transit</li>
                    </ul>
                    <p>
                        Delivery times vary based on your location and shipping
                        method selected.
                    </p>
                </div>
            ),
        },
        {
            id: "6",
            title: "6. Privacy and Data Protection",
            content: (
                <div className="space-y-4">
                    <p>
                        We collect and process personal data in accordance with
                        GDPR and applicable data protection laws. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Contact information for order processing</li>
                        <li>Shipping addresses</li>
                        <li>Payment information</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "7",
            title: "7. Dispute Resolution",
            content: (
                <div className="space-y-4">
                    <p>In case of disputes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Contact our customer service first</li>
                        <li>We aim to resolve issues within 48 hours</li>
                        <li>Independent mediation is available if needed</li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow">
            <div className="text-center py-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold">Terms and Conditions</h1>
                <p className="text-sm text-gray-500 mt-2">
                    Last updated: October 29, 2024
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
                        By using our platform and purchasing used products, you
                        acknowledge that you have read, understood, and agree to
                        be bound by these Terms and Conditions. These terms may
                        be updated periodically, and your continued use of the
                        platform constitutes acceptance of any changes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
