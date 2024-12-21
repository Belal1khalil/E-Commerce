import { useContext } from "react"
import { CartContext } from "../../Context/Cart.context"
import { Link } from "react-router-dom"
import { wishlistContext } from "../../Context/wishList.context";


/* eslint-disable react/prop-types */
   export default function Card({productInfo}) {
    
    // eslint-disable-next-line no-unused-vars
     
    const {imageCover, category , ratingsAverage , description , price , title , id} = productInfo
     const {AddProductToCart} = useContext(CartContext);
      const {AddProductToWishList} =  useContext(wishlistContext)
 
    return <>
       
       <div className=" Card group/card shadow-lg overflow-hidden rounded-lg">
        <div className="relative">
          <img src={imageCover} 
           alt=""
           className="w-full"
           />
          <div className="layer group-hover/card:opacity-100  opacity-0 transition-opacity duration-300 absolute w-full h-full inset-0 bg-black bg-opacity-15 flex justify-center items-center gap-2  ">
               <div onClick={()=>{
                AddProductToWishList({productId :id})
               }}
               
               className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer w-10 h-10 text-white bg-primary-900 rounded-full flex justify-center items-center text-sm">
               <i className="fa-solid fa-heart"></i>
               </div>
                <div onClick={()=>{
                  AddProductToCart({productId:id})
                }}
                className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300  cursor-pointer w-10 h-10 text-white bg-primary-900 rounded-full flex justify-center items-center text-sm">
                <i className="fa-solid fa-cart-shopping"></i>
                </div>
               <Link to={`/product/${id}`} 
               className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300  cursor-pointer w-10 h-10 text-white bg-primary-900 rounded-full flex justify-center items-center text-sm">
               <i className="fa-regular fa-eye"></i>
               </Link>
           </div> 
        </div>

        <div className="p-3 card-body space-y-3">
         <header>
         <h3 className="text-gray-600 text-lg font-semibold line-clamp-1">{title}</h3>
         <h2 className="text-primary-500 font-semibold ">{category.name}</h2>
         </header>

          <p className=" text-gray-400 text-sm line-clamp-2">{description}</p>
         
          <div className="flex justify-between items-center mt-4">
            <span>{price} EGB</span>
            <div className="flex items-center gap-1">
               <i className="fa-solid fa-star text-yellow-500"></i>
               <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
       </div>


    </>
}