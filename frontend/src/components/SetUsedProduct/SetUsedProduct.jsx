import "./SetUsedProduct.css";
import { useState, useContext } from "react";
import { TheContext } from "../../App.jsx";

const SetProduct = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [picMessage, setPicMessage] = useState("");
    const { localDataBank } = useContext(TheContext);

    const postProduct = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setPicMessage("");
        setMessage("");

        try {
            if (!file) {
                setPicMessage("Bitte wählen Sie ein Bild aus");
                setIsLoading(false);
                return;
            }

            // Get form values directly from the event
            const formData = new FormData(event.target);
            const product_name = formData.get("product_name");
            const description = formData.get("description");
            const price = formData.get("price");

            // Erste API-Anfrage zum Speichern der Produktdaten
            const res = await fetch(
                `http://localhost:3000/used-items/set-used-item/${localDataBank.user._id}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        product_name,
                        description,
                        price,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (!data.savedProduct) {
                setMessage(
                    data.message || "Fehler beim Speichern des Produkts"
                );
                setIsLoading(false);
                return;
            }

            // Wenn Produkt erfolgreich gespeichert wurde, lade das Bild hoch
            const imageFormData = new FormData();
            imageFormData.append("file", file);

            const picRes = await fetch(
                `http://localhost:3000/images/${data.savedProduct._id}`,
                {
                    method: "POST",
                    body: imageFormData,
                }
            );

<<<<<<< HEAD
            const picData = await picRes.json();

            if (!picData.success) {
                setPicMessage(
                    picData.message || "Fehler beim Hochladen des Bildes"
                );
                setIsLoading(false);
                return;
            }
=======
        data.error && alert(data.message);

        message.current.style.color = 'green';        
        message.current.innerHTML = data.message;

        if (!data.savedProduct) {
            message.current.style.color = 'red';
            return;
        }

        if (data.savedProduct) {
            console.log(data.savedProduct);
            console.log(formData);

            const picRes = await fetch(`http://localhost:3000/images/${data.savedProduct._id}`, {
                method: 'POST',
                body: formData
            });
        
            const picData = await picRes.json();

            if (picData.error) {
                alert(data.message);
                return;
            }

            picMessage.current.style.color = 'green';
            picMessage.current.innerHTML = picData.message;
>>>>>>> b73896d2f81b09fa8d984e03a4dedbc29b7ec5d5

            setMessage("Produkt erfolgreich gespeichert");
            setPicMessage("Bild erfolgreich hochgeladen");

            // Form zurücksetzen
            event.target.reset();
            setFile(null);
        } catch (error) {
            console.error("Error:", error);
            setMessage("Ein Fehler ist aufgetreten");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="set-product-container">
            <form className="set-product" onSubmit={postProduct}>
                <h2>Set product to sell</h2>

                <div className="form-group">
                    <label htmlFor="product_name">Product name</label>
                    <input
                        type="text"
                        id="product_name"
                        name="product_name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="product_image">Main Picture</label>
                    <input
                        type="file"
                        id="product_image"
                        name="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" name="price" required />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="submit-button"
                >
                    {isLoading ? "Uploading..." : "Submit"}
                </button>

                {message && (
                    <p
                        className={
                            message.includes("Fehler")
                                ? "error-message"
                                : "success-message"
                        }
                    >
                        {message}
                    </p>
                )}

                {picMessage && (
                    <p
                        className={
                            picMessage.includes("Fehler")
                                ? "error-message"
                                : "success-message"
                        }
                    >
                        {picMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

export default SetProduct;
