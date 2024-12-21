import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import CartItem from "../../Components/CartItem/CartItem";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

 export default function Cart() {
       let navigate = useNavigate()
   const {GetCartProducts , CartInfo , ClearCart}  = useContext(CartContext);
  
    useEffect(()=>{
        GetCartProducts()
    },[])

    return <>
    <Helmet>
      <title>Cart Page</title>
    </Helmet>
     { CartInfo === null ? <Loading/> : 
     <section>
         <div className="flex gap-8 items-center mb-6  ">
            <i className="fa-brands fa-opencart text-3xl ml-2 md:ml-0"></i>
            <h2 className=" -ml-4 md:-ml-0 text-xl text-slate-600 font-semibold pl-4 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">Your Shopping Cart</h2>
            </div>  
        { CartInfo.numOfCartItems == 0 ? 
         <div className="mt-6 bg-gray-200 p-5 rounded-md shadow-md flex justify-center items-center flex-col gap-2 ">
            <h2>
               Oops! Your Cart is empty , Start Shopping now by Clicking the button below and find something you love !
            </h2>
            <Link to="/" className="btn bg-primary-600 hover:bg-primary-700 transition-colors duration-300 cursor-pointer text-white"> 
                Back to Home
            </Link>
         </div> : 
         <>
         <div className="space-y-4">
            { CartInfo.data.products.map((Product)=>(
             <CartItem key={Product._id} CartInfo = {Product}/>
            ))}
         </div>
         <div className="mt-6 flex flex-col space-y-3 md:flex-row justify-between items-center">
         <p className="font-semibold text-gray-600 text-xl">
         <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-600"></i>
            Your Total Cart Price <span className="text-primary-600">{CartInfo.data.totalCartPrice}</span> L.E </p>
         <button className="btn w-[380px] md:w-fit bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 cursor-pointer"
          onClick={ClearCart}
         >
         <i className="fa-solid fa-trash mr-2"></i>
            Clear Cart</button>
         </div>
         <Link 
         className="btn w-[375px] ml-2 md:ml-0 bg-primary-600 hover:bg-primary-700 transition-colors duration-300 cursor-pointer text-white uppercase inline-block text-center md:w-full mt-4 "
         onClick={()=>{
            navigate("/checkout")
         }}
         >Next step</Link>
         </>
        }
     </section>
  
     }
    </>
 }