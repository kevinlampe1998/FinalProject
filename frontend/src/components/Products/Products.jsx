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
            <button onClick={() => navigate('/set-product')}>Set Product to sell</button>

            {
                products && products.map(product => (
                    <div key={product._id} className='product-container'>
                        <img src={`${product.main_picture?.url}`} alt={`product ${product.product_name}`}/>
                        <div>
                            <h4>{product.product_name}</h4>
                            <div>{product.description}</div>
                            <div>{product.price}</div>
                            <div>{product.quantity}</div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default Products;