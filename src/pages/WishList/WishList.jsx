import { useContext, useEffect } from "react"
import { wishlistContext } from "../../Context/wishList.context"
import { Helmet } from "react-helmet"
import Loading from "../../Components/Loading/Loading"
import {  Link } from "react-router-dom"
import Wishlist from "../../Components/WishList/wishlist"

export default function WishList() {
     const {GetWishListProducts, WishList} = useContext(wishlistContext)
        
     useEffect(()=>{
       GetWishListProducts()
    }  , [GetWishListProducts])
 return <>
   <Helmet>
    <title>Wish List Page</title>
   </Helmet>
   {WishList == null ? <Loading/> : 
   <section>
     <div className="flex gap-8 items-center mb-6  ">
            <i className="fa-brands fa-opencart text-3xl"></i>
            <h2 className="text-xl text-slate-600 font-semibold pl-4 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">Your Wish List Cart</h2>
            </div>
            { WishList.count == 0 ?  
            <div className="mt-6 bg-gray-200 p-5 rounded-md shadow-md flex justify-center items-center flex-col gap-2 ">
            <h2>
               Oops! Your Wish List Cart is empty , Start Shopping now by Clicking the button below and find something you love !
            </h2>
            <Link to="/" className="btn bg-primary-600 hover:bg-primary-700 transition-colors duration-300 cursor-pointer text-white"> 
                Back to Home
            </Link>
         </div> : <>
           <div className="space-y-4">
           {WishList.data.map((product)=>(
             <Wishlist WishListInfo = {product} key = {product.id}/>
          ))}
           </div>
         </>

            }
   </section>

   }
 </>
}


