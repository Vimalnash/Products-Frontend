import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { setSearchedProductArr, setTotalProductCount } from '../Reducers/productReducer';
import { ProductCard } from '../Components/ProductCard';

export function SearchPage() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
  
    const searchedProductsAvailArr = product.searchedProdArr;
    const totalSearchedProductAvail = product.searchedProdArr.length;

    const [pagingButtons, setPagingButtons] = useState([])
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const [pagingProducts, setPagingProducts] = useState([])
    // console.log("pagingproducts",searchedProductsAvailArr)

    useEffect(()=> {
      // console.log(totalProduct)
      // let buttonCount = 0
      let buttonarray = [];
      for (let i=1; i<=totalSearchedProductAvail; i=i+10) {
        // buttonCount ++
        buttonarray.push(i);
      }
      // console.log("buttonarray",buttonarray);
      let  pagingProducts=  []
      for (let i=0; i<=9; i++) {
        if (product.searchedProdArr[i]) {
          pagingProducts.push(product.searchedProdArr[i]);
        }
      }
      setPagingButtons(buttonarray);
      setPagingProducts(pagingProducts)
    }, [searchedProductsAvailArr, totalSearchedProductAvail])
    
    function fetchPageData(e, val){
      e.preventDefault();
      const skipVal = parseInt(val) - 1
      // console.log("val",val, skipVal)
      // console.log("searchedprod",searchedProductsAvailArr)
      let  pagingProducts=  []
      for (let i=parseInt(val)-1; i<=(parseInt(val)+9); i++) {
        if (product.searchedProdArr[i]) {
          pagingProducts.push(product.searchedProdArr[i]);
        }
      }
      // console.log("pagingproducts",pagingProducts)
      setPagingProducts(pagingProducts)
    }
  
    return (
      <div className='flex flex-col gap-4'>
        <div className='w-full flex flex-wrap justify-center gap-2'>
          {
            pagingProducts
            .map((val, idx) => {
              return <ProductCard key={idx} val={val} />
            })
          }
        </div>
        <div className='p-4 text-center bg-slate-200'>
          <button className='px-2 btn btn-sm' onClick={(e) => {fetchPageData(e, 1); setCurrentPageNo(1)}}>First</button>
          <button 
            className={'px-2 btn btn-sm'} 
            onClick={(e) => {
              if( (currentPageNo-10) >= 1 ) {
                fetchPageData(e, (currentPageNo-10)); 
                setCurrentPageNo(currentPageNo-10);
              }
            }}
          >Previous</button>
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
            onClick={ (e) => {
              if( !((currentPageNo+10) > (pagingButtons[pagingButtons.length-1])) ) {
                fetchPageData(e, (currentPageNo+10)); 
                setCurrentPageNo(currentPageNo+10);
              }
            }}
          >Next</button>
          <button 
            className='px-2 btn btn-sm' 
            onClick={(e) => {
              fetchPageData(e, pagingButtons[pagingButtons.length-1]); 
              setCurrentPageNo(pagingButtons[pagingButtons.length-1])
            }}
          >Last</button>
        </div>
        <div className='h-32'></div>
      </div>
    )
  };
