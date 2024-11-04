import { useContext, useEffect, useState } from "react";
import { TheContext } from "../../App";
import './SeeMyProducts.css';

const MyProduct = ({props: props}) => {

    const deleteProduct = async (_id) => {
        const res = await fetch(`http://localhost:3000/used-items/${_id}`, { method: 'DELETE' });
        const data = await res.json();

        console.log(data);

        location.reload();
    };

    return (
        <div className="see-my-product-container">
            <h4>{props.product_name}</h4>
            <img src={props.main_picture?.url} alt={props.product_name} />
            <div>Description: {props.description}</div>
            <div>Price: {props.price}</div>
            <div>
                <button>Change</button>
                <button onClick={() => deleteProduct(props._id)}>Delete</button>
            </div>
        </div>
    );
};

const SeeMyProducts = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const [ myProducts, setMyProducts ] = useState();

    const fetchMyProducts = async () => {
        const res = await fetch(`http://localhost:3000/used-items/get-my-products/${localDataBank.user._id}`);
        const data = await res.json();

        setMyProducts(data.usedItems);
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    return (
        <section className="see-my-products">
            See My Products

            {
                myProducts && 
                myProducts.map(product => (
                    <MyProduct props={product} key={product._id}/>
                ))
            }
        </section>
    );
};

export default SeeMyProducts;