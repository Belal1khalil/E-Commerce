import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/Protectedroute/Protected";
import UserProvider from "./Context/User.context";
import GuestRoute from "./Components/GuesrRoute/GuestRoute";
import CartProvider from "./Context/Cart.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/Product/ProductDetails";
import Checkout from "./pages/checkout/checkout";
import Orders from "./pages/orders/orders";
import Offline from "./Components/Offline/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Category from "./pages/Category/Category";
import Brand from "./pages/Brand/Brand";
import WishList from "./pages/WishList/WishList";
import WishListprovider from "./Context/wishList.context";
import Forget from "./pages/forgetPassword/forgetpassword";
import Code from "./pages/Verify/verfiycode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";



export default function App() {
  const router = createBrowserRouter([
    {
      path:"/login", element:
      <GuestRoute>
      <Layout />
    </GuestRoute>,
    children: [
      {path:"/login", element:<Login/>},
    ]
    },
    {path:"/", element:
        <ProtectedRoute>  
           <Layout />
        </ProtectedRoute>, 
       children:[
      {index:true, element:<Home />},
      {path:"cart", element:<Cart/>},
      {path:"product/:id", element:<ProductDetails/>},
      {path:"checkout", element:<Checkout/>},
      {path:"allorders", element:<Orders/>},
      {path:"categories", element:<Category/>},
      {path:"brands", element:<Brand/>},
      {path:"wishlist", element:<WishList/>},
    ],
  },

    {path:"/", element : 
    <GuestRoute>
      <Layout />
    </GuestRoute>, 
    children : [
       {path:"/signup", element:<Signup/>},
       {path:"/login", element:<Login/>},
       {path:"/forget-password", element:<Forget/>},
       {path:"/verfiycode", element:<Code/>},
       {path:"/reset-password", element:<ResetPassword/>},
    ],
    },
     
  ]);
  const myClient = new QueryClient()
  return (
    <>
     <QueryClientProvider client={myClient}>
     <UserProvider>
        <WishListprovider>
        <CartProvider>
          <RouterProvider router={router}/>
        </CartProvider>
        </WishListprovider>
    </UserProvider>
   
     <Toaster position="top-right" />
     <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
     <Offline>
      <div className="p-4 rounded-lg shadow bg-gray-200 text-gray-600 fixed right-8 bottom-8 z-50 font-semibold">
       <i className="fa-solid fa-wifi mr-2"></i>
        <span> Check Your Internet Connection</span>
      </div>
     </Offline>
    </> 
        
  )
}

