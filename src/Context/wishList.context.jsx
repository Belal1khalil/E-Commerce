import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";



 // eslint-disable-next-line react-refresh/only-export-components
       export const wishlistContext = createContext(null);
               

 // eslint-disable-next-line react/prop-types
 export default function WishListprovider({children}) {
  
    const {token} = useContext(UserContext);
    const [WishList , setWishListInfo] = useState(null)
   
    /// Add product to WishList
    
    async function AddProductToWishList({productId}) {
        const ToastId = toast.loading("Waiting....")

      try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/wishlist",
            method:"POST",
            headers : {
                token,
            },
            data: {
                productId,
            }
         }
          const {data} = await axios.request(options);
          if(data.status == "success");
          toast.success(data.message)
          GetWishListProducts()
          console.log(data)
         } catch (error) {
        console.log(error)
        }
      finally {
        toast.dismiss(ToastId)
      }
     }
       // get WishList Products
    async  function GetWishListProducts() {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/wishlist",
            method:"GET",
            headers:{
                token,
            },   
     }
     const {data} = await axios.request(options);
     setWishListInfo(data)
     console.log(data)

    }

    // remove product from wishList  
    async function DeleteproductFromWisList({productId}) {
        const ToastId = toast.loading("Deleting.....")
        try { 
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            method:"DELETE",
            headers:{
                token,
            }
        }
         const {data} = await axios.request(options);
         if(data.status == "success") {
            toast.success(data.message);
            setWishListInfo(data)
         }
        
        } catch (error) {
            console.log(error)
        } finally {
            toast.dismiss(ToastId)
        }
    }
    return <wishlistContext.Provider value={{AddProductToWishList , GetWishListProducts , WishList, DeleteproductFromWisList}}>
      {children}
    </wishlistContext.Provider>
 }