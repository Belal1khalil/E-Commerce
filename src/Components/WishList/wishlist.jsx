import { useContext } from "react"
import { wishlistContext } from "../../Context/wishList.context"
import { CartContext } from "../../Context/Cart.context"

// eslint-disable-next-line react/prop-types
export default function Wishlist({WishListInfo}) {
     const {DeleteproductFromWisList} = useContext(wishlistContext)
     const {AddProductToCart} = useContext(CartContext)
    // eslint-disable-next-line react/prop-types, no-unused-vars
    const {imageCover , price , id , slug} = WishListInfo
    return <> 
  <div className=" mt-12 shadow-md flex justify-between items-center relative  border-2 border-slate-200 rounded-md py-4 px-3">
  <div className="wishList-card flex    gap-4 ">
<img 
src={imageCover}
 alt=""
 className="w-28 h-28 rounded-md border-2 border-primary-600 object-cover  shadow-md"
 />
<div className="flex flex-col mt-4 space-y-2 ">
  <h3 className="text-xl font-semibold text-slate-500">{slug}</h3>
  <p className=" font-semibold text-primary-800">{price} $</p>
   <button 
onClick={()=>{
    AddProductToCart({productId :id})
}}
className="btn w-56 md:w-fit   bg-primary-700 font-bold text-white hover:bg-primary-800 transition-all">Add To Cart</button>
</div>

  </div>
  <button
  onClick={()=>{
    DeleteproductFromWisList({productId :id})
  }}
  className="btn w-fit rounded-lg absolute top-2 right-2 bg-red-500 hover:bg-red-600 transition-all font-bold text-white">
       <i className="fa-solid fa-xmark"></i>
  </button>

</div>
    
    </>
}