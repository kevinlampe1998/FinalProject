import { useContext, useEffect, useState, useRef } from "react";
import { TheContext } from "../../App";
import './SeeMyProducts.css';

const MyProduct = ({props: props}) => {
    const productContainer = useRef();
    const [ update, setUpdate ] = useState(false);
    const [ priceValue, setPriceValue ] = useState('0,00');
    const priceRef = useRef();

    const deleteProduct = async (_id) => {
        const res = await fetch(`http://localhost:3000/used-items/${_id}`, { method: 'DELETE' });
        const data = await res.json();

        console.log(data);

        location.reload();
    };

    
    const correctPrice = (event) => {
        const value = event.target.value;

        if (value.length < 4) {
            const removedComma = value.replace(',', '');
            const unshiftZeroComma = removedComma.split('');
            unshiftZeroComma.unshift('0,');
            setPriceValue(unshiftZeroComma.join(''));
            return;
        }

        
        const numbers = '0123456789'.split('');
        
        const lastChar = value.slice(-1);
        
        if (!numbers.includes(lastChar)) {
            setPriceValue(value.slice(0, -1));
            return;
        }
        
        const removedComma = value.replace(',', '');
        
        const numberArray = removedComma.split('');
        numberArray.splice(numberArray.length - 2, 0, ',');
        
        const under2Digits = numberArray.length < 4 && numberArray.join('').replace(',', '');
        
        const prePrice = under2Digits ? under2Digits : numberArray.join('');
        
        if (prePrice.length > 4 && prePrice[0] === '0') {
            const removedZero = prePrice.split('');
            removedZero.shift();
            console.log(removedZero);
            setPriceValue(removedZero.join(''));
            return;
        }

        setPriceValue(prePrice);
    };

    const changeToForm = () => {

        productContainer.current.children[1].innerHTML = 'Main Picture';

        const oldDivTag = productContainer.current.children[2];
        const newPictureInput = document.createElement('input');
        newPictureInput.setAttribute('type', 'file');
        oldDivTag.replaceWith(newPictureInput);
        
        const oldName = productContainer.current.children[4];
        const newNameInput = document.createElement('input');
        newPictureInput.innerHTML = 'Hello';
        newNameInput.setAttribute('value', oldName.innerHTML);
        oldName.replaceWith(newNameInput);

        const oldDescription = productContainer.current.children[6];
        const newDescriptionInput = document.createElement('input');
        newDescriptionInput.setAttribute('value', oldDescription.innerHTML);
        oldDescription.replaceWith(newDescriptionInput);

        const oldPrice = productContainer.current.children[8].innerHTML;
        setUpdate(true);

        const deleteButton = productContainer.current.children[9].children[1];
        deleteButton.style.display = 'none';
        
        const changeButton = productContainer.current.children[9].children[0];
        changeButton.innerHTML = 'Update';
    };

    const updateProduct = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:3000/used-items/${props._id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify()
        });
        const data = await res.json();

        console.log(data.message);
    };

    return (
        <div ref={productContainer} className="see-my-product-container">
            <img src={props.main_picture?.url} alt={props.product_name} />
            <h5></h5>
            <div></div>
            <h5>Product Name</h5>
            <h4>{props.product_name}</h4>
            <h5>Description:</h5>
            <div>{props.description}</div>
            <h5>Price:</h5>
            {
                update ?
                    <input ref={priceRef} onChange={correctPrice} value={priceValue}/>
                :
                    <div>{props.price}</div>
            }
            <div>
                {   
                    update ?
                    <button onClick={updateProduct}>Update</button>
                    : <button onClick={changeToForm}>Change</button>

                }
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