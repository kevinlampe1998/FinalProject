import './Products.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState();

    const getProducts = async () => {
        const res = await fetch('http://localhost:3000/products');
        const data = await res.json();

        setProducts(data.products);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="products">
            <button onClick={() => navigate('/set-product')}>Set product to sell</button>

            {
                products && products.map(product => (
                    <div key={product._id} className='product-container'>
                        <h4>Product: {product.product_name}</h4>
                        <img src={`${product.main_picture?.url}`} alt={`product ${product.product_name}`}/>
                        <div>
                            <div>Seller: {product.seller_name ?
                                product.seller_name : 'Anonym'}</div>
                            <div>Description: {product.description}</div>
                            <div>Price: {product.price}</div>
                            <div>Quantity: {product.quantity}</div>
                            <div>
                                <button onClick={() => navigate(`/product/${product._id}`)}>Show me the product</button>
                                <button>Add to Wishlist</button>
                                <button>Buy</button>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default Products;