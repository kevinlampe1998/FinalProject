import './UsedItems.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { TheContext } from '../../App';
import MailSystem from '../MailSystem/MailSystem.jsx';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState();
    const { localDataBank, dispatch } = useContext(TheContext);

    const getProducts = async () => {
        const res = await fetch('http://localhost:3000/used-items');
        const data = await res.json();

        setProducts(data.products);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const addToUsedShoppingCart = async (productId) => {
        console.log(productId);
        console.log(localDataBank.user._id);

        const res = await fetch('http://localhost:3000/used-shopping-cart', {
            method: 'POST',
            body: JSON.stringify({
                productId, userId: localDataBank.user._id
            }),
            headers: { 'content-type': 'application/json' }
        });

        const data = await res.json();

        console.log(data);
    };

    return (
        <div className="products">
            <button onClick={() => navigate('/set-used-item')}>Set product to sell</button>

            {
                products && products.map(product => (
                    <div key={product._id} className='product-container'>
                        <h4>Product name: {product.product_name}</h4>
                        <img src={`${product.main_picture?.url}`} alt={`product ${product.product_name}`}/>
                        <div>
                            <div>Seller: {product.seller_name ?
                                product.seller_name : 'Anonym'}</div>
                            <div>Description: {product.description}</div>
                            <div>Price: {product.price}</div>
                            <div>Quantity: {product.quantity}</div>
                            <div>
                                <button onClick={() => navigate(`/used-item/${product._id}`)}>Show me the product</button>
                                <button>Add to wishlist</button>
                                <button onClick={() => addToUsedShoppingCart(product._id)}>Add to shopping cart</button>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default Products;