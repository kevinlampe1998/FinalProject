import './SetUsedProduct.css';
import { useState, useRef, useContext, useEffect } from 'react';
import { TheContext } from '../../App.jsx';

const SetProduct = () => {
    const [file, setFile] = useState();
    const setProductForm = useRef();
    const message = useRef();
    const picMessage = useRef();
    const [ priceValue, setPriceValue ] = useState('0,00');    

    const { localDataBank, dispatch } = useContext(TheContext);

    const postProduct = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        
        const product_name = setProductForm.current.children[2].value;
        
        const description = setProductForm.current.children[6].value;

        const price = setProductForm.current.children[8].value;

        console.log(product_name, description, price);


        const res = await fetch(`http://localhost:3000/used-items/set-used-item/${localDataBank.user._id}`, {
            method: 'POST',
            body: JSON.stringify({
                product_name, description, price
            }),
            headers: { 'content-type': 'application/json' }
        });
        console.log('res', res)

        const data = await res.json();
        console.log('data', data);

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

            // if (picData.image) {
            //     setTimeout(location.reload(), 2000);
            // }
        }
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
    
    return (
        <form className="set-product" onSubmit={postProduct} ref={setProductForm}>
            <h2>Set product to sell</h2>

            <label>Product name</label>
            <input type="text"/>

            <label>Main Picture</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>

            <label>Description</label>
            <textarea></textarea>

            <label>Price</label>
            <input type="text" onChange={correctPrice} value={priceValue}/>

            <button type='submit'>Submit</button>
            <h3 ref={message}></h3>
            <h3 ref={picMessage}></h3>
        </form>
    );
};

export default SetProduct;