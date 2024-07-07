import { useEffect, useState } from "react";

const Home = () => {
    const [items, setItems] = useState([]);
    console.log(typeof(items))
    console.log(items[0]);
    const data = async() =>{
        const response = await fetch("https://dummyjson.com/products");
        const item = await response.json();
        setItems(item?.products);
    }
    useEffect(()=>{
        data();
        
    },[])
 
    return(
        <div className="home-container">
            <div className="card-container" style={{display:"flex",flexDirection:"row", flexWrap:"wrap",justifyContent:"space-between"}}>
              {Array.isArray(items) && items.map((x:any)=>{
                return(
                    <div className="product-card" key={x?.id}>
                    <div className="product-image">
                    <img src={x?.images[0]} style={{height:"200px"}}/>
                    </div>
                    <div className="product-description">
                    <p>{x?.title}</p>
                    </div>
                   </div>
                )
              })}
               
            </div>
        </div>
    )
}

export default Home;