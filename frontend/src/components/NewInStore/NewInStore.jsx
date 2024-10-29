import { useEffect, useState } from "react";
import './NewInStore.css';
import ThreeDExample from "../ThreeDExample/ThreeDExample";

const Home = () => {
  // const [randomProducts, setRandomProducts] = useState();

  // const fetchRandomProducts = async () => {
  //   const res = await fetch('http://localhost:3000/home/get-random-product-images');
  //   const data = await res.json();

  //   setRandomProducts(data.randomProducts);
  // };

  // useEffect(() => {
  //   fetchRandomProducts();
  // }, []);

  return (
    <section className="home">
        <h1>Welcome to our Tech Oase</h1>
        <ThreeDExample/>
        {/* <div className="home-pics">
        {
          randomProducts && randomProducts.map(product => (
            <img key={product._id} src={product.main_picture?.url} />
          ))
        }
        </div> */}
    </section>
  );
};

export default Home;