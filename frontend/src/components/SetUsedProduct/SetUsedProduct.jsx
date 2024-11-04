import './SetUsedProduct.css';
import { useState, useRef, useContext, useEffect } from 'react';
import { TheContext } from '../../App.jsx';

const SetProduct = () => {
    const [file, setFile] = useState();
    const setProductForm = useRef();
    const message = useRef();
    const picMessage = useRef();

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

            <button type='submit'>Submit</button>
            <h3 ref={message}></h3>
            <h3 ref={picMessage}></h3>
        </form>
    );
};

export default SetProduct;