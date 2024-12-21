/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CartItem({CartInfo}) {
     // eslint-disable-next-line react/prop-types
     const { count , price , product } = CartInfo;
     // eslint-disable-next-line react/prop-types, no-unused-vars
     const {title , imageCover , category , id} = product;
      const {RemoveProduct , UpdateProductQuantity } = useContext(CartContext)
    return <>
    <div className="flex gap-2 ">
    <div className="cart-item relative space-x-3  grow bg-gray-200 py-4 px-6 rounded-lg shadow-lg flex  items-center justify-between ">
         <div>
         <img src={imageCover}
         className="w-24 h-24 object-cover rounded-full border-4 border-white"
         alt="" />
         </div>
          <div className="space-y-3 flex flex-col md:flex-row">
          <div className="flex flex-col ml-4 md:ml-0 md:flex-row md:justify-center md:items-center md:space-x-24">
           <h3 
           className="text-lg text-gray-700 font-semibold">
            <Link to={`/product/${id}`}>{title}</Link>
            
            </h3>
           <h4 
           className=" text-gray-500 font-semibold">
            {category.name} 
            </h4>
           </div>
           <div className="count flex  items-center gap-3 le md:ml-36 ">
             <span className="font-bold text-xl text-gray-500 ml-4 md:ml-0">{count}</span>
             <div className="flex flex-col gap-2 text-xl cursor-pointer ">
               <div 
               className="plus"
               onClick={()=>{
                UpdateProductQuantity({productId : id , count: count + 1})
               }}
               >
               <i className="fa-solid fa-circle-plus" ></i>
               </div>
               <div className="minus" 
               onClick={()=>{
                UpdateProductQuantity({productId : id , count : count - 1})
               }}>
               <i className="fa-solid fa-circle-minus"></i>
               </div>
             </div>
            
           </div>
            </div> 
           <span className="font-semibold block mt-14 md:mt-0 text-primary-900">{price} L.E</span>
           <button className="bg-red-500 absolute top-2 right-2 hover:bg-red-600 transition-colors duration-300 px-2 rounded-lg text-white"
       onClick={()=>{
        RemoveProduct({productId:id})
       }}
      >
      <i className="fa-solid fa-xmark"></i>
      </button>
      </div >
      
    </div>
       
    </>
}