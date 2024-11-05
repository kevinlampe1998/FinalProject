import { useEffect, useState } from "react";
import "./NewInStore.css";
import ThreeDExample from "../ThreeDExample/ThreeDExample";

const Home = () => {
    const [customerName, setCustomerName] = useState("Guest");

    return (
        <section className="home">
            <p className="rotating-welcome">Welcome {customerName}</p>
            <h1>Welcome to Tech Oase</h1>
            <ThreeDExample />
        </section>
    );
};

export default Home;
