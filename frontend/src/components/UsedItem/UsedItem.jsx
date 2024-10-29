import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UsedItem.css';

const Product = () => {
    const { _id } = useParams();
    const [product, setProduct] = useState();

    const fetchProduct = async () => {
        const res = await fetch(`http://localhost:3000/used-item/${_id}`);
        const data = await res.json();
        console.log(data);

        setProduct(data.product);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <section className="single-product">
            {
                product &&

                <div>
                    <h3>Seller: {product.seller_name}</h3>
                    <h4>Product name: {product.product_name}</h4>
                    <img src={product.main_picture.url} />
                    <div>Description: {product.description}</div>
                    <div>Price: {product.price}</div>
                </div>
            }

            <button>Add to wishlist</button>
            <button>Buy</button>

            <div className="product-comments">
                <h5>Comments and Ratings</h5>

                {
                    [1, 2, 3].map((index) => (
                        <div key={index} className="single-product-comment">
                            <span>Username who comments</span>
                            <span>I like this product</span>
                        </div>
                    ))
                }
            </div>

        </section>
    );
};

export default Product;