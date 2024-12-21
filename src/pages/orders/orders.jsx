/* eslint-disable no-undef */

import { jwtDecode } from "jwt-decode"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/User.context"
import axios from "axios"
import Loading from "../../Components/Loading/Loading"
import { Helmet } from "react-helmet"

export default function Orders() {
        const[userOrders , SetUserOrders] = useState(null)
       const {token} = useContext(UserContext)
       let {id} = jwtDecode(token)
   
    async function UserOrders() {
      try {
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method:"GET",
          }
            let{data} = await axios.request(options)
              console.log(data)
            SetUserOrders(data)
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(()=>{
        UserOrders()
    } , [])



    return <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
        {userOrders ?  
         <section>
          {userOrders.map((Order)=>(
            <>
               <div key={Order.id} className="border-2 border-gray-400 border-opacity-30 p-4 rounded-lg">
          <header className="flex justify-between items-center">
          <div>
               <h2 className="text-gray-400">Order ID</h2>
               <span className="font-bold text-lg">#{Order.id}</span>
              
           </div>
           <div>
             {Order.isDelivered? (
                <span className="bg-primary-400 font-cairo text-white font-semibold px-3 py-1 rounded-full mx-3">تم التوصيل</span>
             ) :(
              <span className="bg-blue-500 font-cairo text-white font-semibold px-3 py-1 rounded-full mx-3">
                قيد التوصيل
                </span>)
                }
                {Order.isPaid ? (
                     <span className="bg-lime-400 font-cairo text-white font-semibold px-3 py-1 rounded-full mx-3">
                     تم الدفع
                     </span>
                ):(
                    <span className="bg-blue-500 font-cairo text-white font-semibold px-3 py-1 rounded-full mx-3">
                    غير مدفوع
                    </span>
                )}
           
           </div>
          </header>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-4">
           {Order.cartItems.map((product)=>(
            <>
            <div key={product._id} className="product-item border-2 border-gray-500 border-opacity-30 rounded-lg p-4">
               <img 
               src={product.product.imageCover}
                alt="" 
                className="w-full"
                />
                <h3 className="text-lg font-semibold">{product.product.title}</h3>
                <span>{product.price} L.E</span>
           </div>
            </>
           ))

           }
          </div>
        </div> 
            </>
          ))

          }
         </section>: <Loading/>

        }
       </>
}