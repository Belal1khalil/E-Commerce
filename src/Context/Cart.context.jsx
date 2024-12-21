/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
  export const CartContext = createContext(null);
// eslint-disable-next-line react-hooks/rules-of-hooks

  export default function CartProvider({children}) {
    
    const {token} = useContext(UserContext);
    const [CartInfo , setCartInfo] = useState(null);
   
         // # Add Product to Cart
   
    async function AddProductToCart({productId}) {

      const ToastId = toast.loading("Waiting....")
      
      try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method:"POST",
            headers: {
               token
            },
            data:{
               productId
            }
           }
           const {data} =await axios.request(options)
           if(data.status == "success") {
            toast.success(data.message);
            GetCartProducts()
           }
       }
        catch (error) {
            console.log(error)
       } finally {
           toast.dismiss(ToastId)
       }
    }

         // get products
   
    async function GetCartProducts() {
      try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method:"Get",
            headers:{
                token
            }
        }
         const{data} = await axios.request(options);
         setCartInfo(data);
     }
      catch (error) {
        console.log(error);
      }
     
    }

         /// remove product

    async function RemoveProduct({productId}) {
        let loadingId = toast.loading("Deleting....")
      try {
        const options = {

            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "DELETE",
            headers : {
                token,
            }
        }
           const {data} = await axios.request(options)
            if(data.status == "success") {
                toast.success("Product Deleted Successfully")
                setCartInfo(data)
            }
        
      } catch (error) {
        console.log(error)
      } finally {
        toast.dismiss(loadingId)
      }
    }

           // clearCart
    async function ClearCart() {
       let loadingId = toast.loading("Deleting Products.....")
   try {
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/cart",
        method:"DELETE",
        headers :{
            token,
        }
    }
    const{data} = await axios.request(options);
    if(data.message == "success") {
        toast.success("Cart has been cleared");
        setCartInfo({
          numOfCartItems : 0  
        })
    }
   } catch (error) {
    console.log(error)
   } finally {
    toast.dismiss(loadingId)
   }
    }

          /// updateproduct Quantity
    async function UpdateProductQuantity({productId , count }) {
        let loadingId = toast.loading("update product count....")
       try {
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "PUT",
            headers: {
                token,
            },
            data: {
                count,
            }
        }
        const {data} = await axios.request(options)
         if(data.status == "success") {
            toast.success("Count Updated")
            setCartInfo(data)
         }
       } catch (error) {
        console.log(error)
       } finally {
         toast.dismiss(loadingId)
       }
    }


    return <CartContext.Provider value={{AddProductToCart ,GetCartProducts , CartInfo , RemoveProduct , ClearCart , UpdateProductQuantity}} >
          {children}
         </CartContext.Provider>
}

















// async function getCartproducts() {
//     try {
//         const options={
//             url:"https://ecommerce.routemisr.com/api/v1/cart",
//             method:"GET",
//             headers:{
//                 token
//             }
//         }
//         const {data} = await axios.request(options);
//         console.log(data)
//         setCartInfo(data)
//     } catch (error) {
//         console.log(error);
//     }
//    }//
