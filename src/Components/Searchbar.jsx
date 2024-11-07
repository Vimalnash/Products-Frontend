import { useNavigate } from "react-router-dom";
import { setSearchedProductArr } from "../Reducers/productReducer";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";

export function Searchbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
  
    const [searchProdName, setSearchProdName] = useState("");
    const [searchProdCategory, setSearchProdCategory] = useState("");

    function searchProduct () {
        navigate("/search");
        // dispatch(setSearchProduct({ 
        //     searchProducts : {
        //         searchProductNameFinal: searchProdName, 
        //         searchProdCategoryFinal: searchProdCategory 
        //     }
        // }))
        fetch(`https://dummyjson.com/products?limit=100&skip=0`, {
            method: "GET"
          })
          .then((res) => res.json())
          .then((data) => {
            // console.log("rcvdData",data, data.total);
            const searchedProductArr = data.products
            .filter((val,idx) => {
              if (searchProdCategory === "") {
                return val;
              } else {
                return searchProdCategory === val.category
              }
            })
            .filter((val, idx) => {
              if (searchProdName === "") {
                return val;
              } else {
                return searchProdName.toLowerCase() === val.title.toLowerCase().substr(0, searchProdName.length)
              }
            })
            dispatch(setSearchedProductArr({searchedProdArr: searchedProductArr}))
          })
    };

    return (
        <div className="p-2 flex flex-wrap gap-4 bg-slate-400">
            <input 
                className='p-2 rounded-md' 
                type="text" 
                value={searchProdName} 
                onChange={(e) => { setSearchProdName(e.target.value); navigate("/search")} }
                placeholder='ProductNameSearch'
            />
            <select 
                className='p-2 rounded-md' 
                value={searchProdCategory} 
                onChange={(e) => { setSearchProdCategory(e.target.value); navigate("/search")} }
            >
                <option></option>
                {
                product.productCategories.map((val, idx) => {
                    return <option key={idx} value={val.slug}>{val.name}</option>
                })
                }
            </select>
            <button onClick={searchProduct}>Search</button>
        </div>
    )
}