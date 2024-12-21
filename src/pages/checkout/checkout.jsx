import { useFormik } from "formik"
import { useContext, useState } from "react";
import { UserContext } from "../../Context/User.context";
import axios from "axios";
import { CartContext } from "../../Context/Cart.context";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
    let navigate  = useNavigate()
     const {CartInfo} = useContext(CartContext)
     const  {token}    = useContext(UserContext)
     const[PaymentMethod , setPaymentMethod]=useState(null)

     async function handleCashorder(values) {
        let toastId = toast.loading("Creating Cash Order")
      try {
        const options = {
            url :`https://ecommerce.routemisr.com/api/v1/orders/${CartInfo.cartId}`,
            method:"POST",
            headers : {
                token,
            },
            data :{
              values
            }
        }
          const {data} = await axios.request(options);
           if(data.status == "success") {
            toast.success("Cash Order has been Created")
            setTimeout(() => {
                navigate("/allorders")
            }, 2000);
           }
      } catch (error) {
        console.log(error)
      } finally {
        toast.dismiss(toastId)
      }
    }

    async function handleOnlinePayment(values) {
        
       try {
        const options = {
            url :`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartInfo.cartId}?url=${location.origin}`,
            method:"POST",
            headers : {
                token,
            },
            data:values
        }
        let {data} = await axios.request(options)
        if(data.status == "success") {
            toast.loading("redirecting you to stripe"),
            setTimeout(() => {
                location.href = data.session.url
            }, 2000);
        }
       } catch (error) {
        console.log(error)
       }
    }


    const formik = useFormik({
        initialValues :{
            "shippingAddress":{
        "details": "details",
        "phone": "01010800921",
        "city": "Cairo"
        }
        },
        // eslint-disable-next-line no-unused-vars
        onSubmit: (values)=>{
          if(PaymentMethod === "cash") {
            handleCashorder();
          } else {
            handleOnlinePayment();
          }
        },
    })


    return (
       <>
       <h1 className="text-2xl font-semibold text-gray-700">Shipping Address</h1>
       <form className="space-y-4 mt-5" onSubmit={formik.handleSubmit}>
        <div className="city ">
            <input type="text" 
            placeholder="city" 
            className="form-control w-full" 
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            name="shippingAddress.city"
            />
        </div>
       
        <div className="phone" >
           <input type="tel" 
           placeholder="phone" 
           className="form-control w-full" 
           value={formik.values.shippingAddress.phone}
           onChange={formik.handleChange}
           name="shippingAddress.phone"
           />
        </div>
        
         <div className="details">
            <textarea 
            placeholder="details" 
            className="form-control w-full"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
             name="shippingAddress.details"
            />
         </div>
          <div className="space-x-2">
          <button 
          className="btn bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white uppercase"
          onClick={()=> {
            setPaymentMethod("cash")
          }}
          >Cash Order</button>
          <button 
          className="btn bg-primary-700 hover:bg-primary-800 transctions-colors duration-300 text-white uppercase"
          onClick={()=> {
            setPaymentMethod("online")
          }}
          >Online Payment</button>
          </div>
       </form>
       </>
    )
}

