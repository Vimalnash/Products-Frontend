import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { setProductCategory, setProducts, setTotalProductCount } from '../Reducers/productReducer';
import { ProductCard } from '../Components/ProductCard';

export function LandingPage() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

  
    const [pagingButtons, setPagingButtons] = useState([])
    const [currentPageNo, setCurrentPageNo] = useState(1)
    // console.log("products",product)
  
  
    useEffect(() => {
      fetch(`https://dummyjson.com/products?limit=10&skip=0`, {
        method: "GET"
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log("rcvdData",data, data.total);
        dispatch(setTotalProductCount({totalProducts: data.total}))
        dispatch(setProducts({productArr: data.products}))
      })
    }, [])
  
    useEffect(() => {
      fetch(`https://dummyjson.com/products/categories`, {
        method: "GET"
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log("rcvdData",data);
        dispatch(setProductCategory({productCategories: data}));
      })
    }, [])
    
    useEffect(()=> {
      const totalProduct = product.totalProducts;
      // console.log(totalProduct)
      // let buttonCount = 0
      let buttonarray = [];
      for (let i=1; i<=totalProduct; i=i+10) {
        // buttonCount ++
        buttonarray.push(i);
      }
      // console.log("buttonarray",buttonarray);
      setPagingButtons(buttonarray);
    }, [product.totalProducts])
    
    // console.log("total products",product.totalProducts);
    // console.log("totalPagebuttons",pagingButtons);
  
    function fetchPageData(e, val){
      e.preventDefault();
      const skipVal = parseInt(val) - 1
      // console.log("val",val, skipVal)
      fetch(`https://dummyjson.com/products?limit=10&skip=${skipVal}`, {
        method: "GET"
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log("rcvdData",data, data.total);
        dispatch(setProducts({productArr: data.products, totalProducts: data.total}))
      })
    }
  
    return (
      <div className='flex flex-col gap-4'>
        <div className='w-full flex flex-wrap justify-center gap-2'>
          {
            product.productArr
            .map((val, idx) => {
              return <ProductCard key={idx} val={val} />
            })
          }
        </div>
        <div className='p-4 text-center bg-slate-200'>
          <button 
          className='px-2 btn btn-sm' 
          onClick={(e) => {
            fetchPageData(e, 1); setCurrentPageNo(1)
            }}>
            First</button>
          <button 
          className={'px-2 btn btn-sm'} 
          onClick={(e) => {
            if( (currentPageNo-10) >= 1 ) {
            fetchPageData(e, (currentPageNo-10)); setCurrentPageNo(currentPageNo-10)
            }
          }}>
            Previous</button>
          <div className='w-96 inline-block'>
            <div className='flex overflow-x-scroll'>
              {
                pagingButtons.map((val, idx) => {
                  return <button key={idx} className={`${parseInt(val)===currentPageNo?"bg-gray-800 text-white":""} rounded-lg px-2 btn btn-sm`} onClick={(e) => {fetchPageData(e, val); setCurrentPageNo(parseInt(val))}}>{val}</button>
                })
              }
            </div>
          </div>
          <button 
          className='px-2 btn btn-sm' 
          onClick={(e) => {
            if( !((currentPageNo+10) > (pagingButtons[pagingButtons.length-1])) ) {
              fetchPageData(e, (currentPageNo+10)); setCurrentPageNo(currentPageNo+10)
            }
          }}>
            Next</button>
          <button className='px-2 btn btn-sm' onClick={(e) => {fetchPageData(e, pagingButtons[pagingButtons.length-1]); setCurrentPageNo(pagingButtons[pagingButtons.length-1])}}>Last</button>
        </div>
        <div className='h-32'></div>
      </div>
    )
  }
  
