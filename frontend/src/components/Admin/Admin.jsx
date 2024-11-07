import { useState } from "react";
import "./Admin.css";

const AddNewProduct = () => {
    return <div className="add-new-product"></div>;
};

const Admin = () => {
    const [currentPage, setCurrentPage] = useState("add-new-product");

    return (
        <section className="admin">
            <nav>
                <a href="#">User Help Chats</a>
                <a href="#">Add New Product</a>
            </nav>
            <div>
                {currentPage === "add-new-product" ? (
                    <AddNewProduct />
                ) : (
                    <>Error loading a admin page</>
                )}
            </div>
        </section>
    );
};

export default Admin;
