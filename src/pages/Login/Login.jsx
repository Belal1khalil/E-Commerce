import axios from "axios";
import { useFormik } from "formik"
import {  useContext, useState } from "react";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { data, Link, useNavigate } from "react-router-dom";
import { object,string } from "yup"
import { UserContext } from "../../Context/User.context";


export default function Login() {
    const {setToken} = useContext (UserContext);
    const navigate = useNavigate()
   const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
   const[incorrectemailorpassword , setIncorrectEmailorPassword] = useState(null)
    

   async function SendDataToLogin(values) {
     let loadingId = toast.loading("Waiting...")
     try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
            method:"POST",
            data:values,
        }

          let {data}= await axios.request(options);
           if(data.message === "success") {
            localStorage.setItem("token" , data.token)
            setToken(data.token)
            toast.success("User Logged In Successfully")
            setTimeout(()=>{
             navigate("/")
            },2000)
           }
           
          }
     catch(error) {
      setIncorrectEmailorPassword(error.response.data.message)
       toast.error(error.response.data.message)
     } finally {
        toast.dismiss(loadingId)
     }
   }

    const validationSchema = object({
    email:string()
    .required("Email is required")
    .email("Email is invalid"),
    password:string()
    .required("Password is required")
    .matches(
      passwordRegex , 
      "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
       ),
   })

   const formik = useFormik({
        initialValues:{ 
          "email":"",
          "password":"",
        },
        validationSchema,
        onSubmit:SendDataToLogin
    })
    return <>
    <h1 
    className="text-xl   text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-user mr-2"></i> 
           Register Now
        </h1>
        <form className="space-y-3 border-2 border-primary-500 px-4 py-3 rounded-md shadow-lg" onSubmit={formik.handleSubmit}>
        <div className="email">
            <input 
            type="email" 
            placeholder="Email Address" 
            className="form-control w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            />
            { 
            formik.errors.email && 
            formik.touched.email && 
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.email}</p>
            }
           
        </div>
        <div className="password">
            <input 
            type="password" 
            placeholder="Enter password" 
            className="form-control w-full"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            />
            { 
            formik.errors.password && 
            formik.touched.password && 
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.password}</p>
            }
             {
               incorrectemailorpassword && 
               <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
                * {incorrectemailorpassword}</p>
            }
        </div>
        <div>
          <Link to="/forget-password" className="flex justify-end font-bold hover:text-primary-700 transition-all text-slate-600">forget your Password?</Link>
        </div>
        <button type="submit" className="btn w-full uppercase text-white bg-primary-700 hover:bg-primary-800">Log in</button>
        </form>
    </>
    
 }








































