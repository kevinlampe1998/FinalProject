import './SetProduct.css';
import { useState, useRef, useContext, useEffect } from 'react';
import { TheContext } from '../../App.jsx';

const SetProduct = () => {
    const [file, setFile] = useState();
    const setProductForm = useRef();
    const message = useRef();
    const picMessage = useRef();

    const { localDataBank, dispatch } = useContext(TheContext);

    useEffect(() => {
        console.log(localDataBank.user._id);
    });

    const postProduct = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        
        const product_name = setProductForm.current.children[2].value;
        console.log(product_name);
        
        const description = setProductForm.current.children[6].value;
        console.log(description);

        const price = setProductForm.current.children[8].value;
        console.log(price);

        const quantity = setProductForm.current.children[10].value;
        console.log(quantity);



        const res = await fetch(`http://localhost:3000/products/set-product/${localDataBank.user._id}`, {
            method: 'POST',
            body: JSON.stringify({
                product_name, description, price, quantity
            }),
            headers: { 'content-type': 'application/json' }
        });

        const data = await res.json();

        console.log(data);
        message.current.style.color = 'green';        
        message.current.innerHTML = data.message;

        if (!data.savedProduct) {
            message.current.style.color = 'red';
            return;
        }

        console.log(data.savedProduct);

        if (data.savedProduct) {

            console.log(formData);
        
            const picRes = await fetch(`http://localhost:3000/images/${data.savedProduct._id}`, {
                method: 'POST',
                body: formData
            });
        
            const picData = await picRes.json();
            console.log(picData);

            picMessage.current.style.color = 'green';
            picMessage.current.innerHTML = picData.message;

        }

    };
    
    return (
        <form className="set-product" onSubmit={postProduct} ref={setProductForm}>
            <h2>Set product to sell</h2>

            <label htmlFor="">Product name</label>
            <input type="text" />

            <label htmlFor="">Main Picture</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>

            <label htmlFor="">Description</label>
            <textarea name="" id=""></textarea>

            <label htmlFor="">Price</label>
            <input type="text"/>

            <label htmlFor="">Quantity</label>
            <input type="number" />

            <button>Submit</button>
            <h3 ref={message}></h3>
            <h3 ref={picMessage}></h3>
        </form>
    );
};

export default SetProduct;