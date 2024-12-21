import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { data, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup"

export default function Signup() {
    const navigate = useNavigate()
    const[accoutExistError ,setaccoutExistError] = useState(null)
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const phoneRegex = /^(02)?01[0125][0-9]{8}$/

   async function SendDataToRegister(values) {
     let loadingId = toast.loading("Waiting...")
     try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
            method:"POST",
            data:values,
        }
          let {data}= await axios.request(options);
          if(data.message === "success") {
            toast.dismiss(loadingId)
            toast.success("User Created Successfully")
            setTimeout(()=> {
              navigate("/login")
            },2000)
          }
     }
     catch(error) {
        toast.error(error.response.data.message)
        setaccoutExistError(error.response.data.message)
     } finally {
        toast.dismiss(loadingId)
     }
   }

    const validationSchema = object({
    name:string().required("Name is required").min(3,"Name must be at least 3 char").max(25,"Name can not be more than 25 char"),
    email:string().required("Email is required").email("Email is invalid"),
    password:string().required("Password is required").matches(passwordRegex , "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword:string().required("Confirm password is required").oneOf([ref("password")]),
    phone:string().required("Phone is required").matches(phoneRegex,"Sorry , We Accept Egyption Phone Numbers Only")
   })

   const formik = useFormik({
        initialValues:{
          "name": "",
          "email":"",
          "password":"",
          "rePassword":"",
          "phone":""
        },
        validationSchema,
        onSubmit:SendDataToRegister,
    })
    return <>
    <h1 
    className="text-xl  text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-user mr-2 ml-2 md:ml-0"></i> 
           Register Now
        </h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="name">
            <input 
            type="text" 
            placeholder="Type your name" 
            className="form-control w-[365px] ml-3 md:w-full md:ml-0"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            />
            { 
            formik.errors.name && 
            formik.touched.name && 
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.name}</p>
            }
        </div>
        <div className="email">
            <input 
            type="email" 
            placeholder="Email Address" 
            className="form-control w-[365px] ml-3 md:w-full md:ml-0"
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
            {
                accoutExistError && 
                <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
                * {accoutExistError}</p>
            }
        </div>
        <div className="password">
            <input 
            type="password" 
            placeholder="Enter password" 
            className="form-control w-[365px] ml-3 md:w-full md:ml-0"
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
        </div>
        <div className="repassword">
            <input 
            type="password" 
            placeholder="Confirm password" 
            className="form-control w-[365px] ml-3 md:w-full md:ml-0"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
            />
            { 
            formik.errors.rePassword && 
            formik.touched.rePassword && 
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.rePassword}</p>
            }
        </div>
        <div className="phone">
            <input 
            type="tel" 
            placeholder="Phone number" 
            className="form-control w-[365px] ml-3 md:w-full md:ml-0"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
            />
            { 
            formik.errors.phone && 
            formik.touched.phone && 
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.phone}</p>
            }
        </div>
        <button type="submit" className="btn ml-1 w-[380px] md:w-full md:ml-0 uppercase text-white bg-primary-700 hover:bg-primary-800">Sign Up</button>
        </form>
    </>
    
 }











































//  const navigate = useNavigate()
//  const [accoutExistError , setAccoutExistError] = useState(null)
 
//  const PasswoedRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

//  const phoneRegex = /^(02)?01[0125][0-9]{8}$/

//  const validationSchema = object({
//      name:string()
//      .required("name is required")
//      .min(3 ,"Name must be at least 3 char")
//      .max(25 , "Name can not be more than 25 char "),

//      email:string()
//      .required("Email is required")
//      .email("Email is invalid"),
     
//      password:string()
//      .required("Password is required")
//      .matches (
//      PasswoedRegex , 
//       "Password should be at least Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
//      ),
//      rePassword:string()
//      .required("Confirm Password is required")
//      .oneOf([ref("password")], 
//      "password and confirm password should be the same"
//     ),
//     phone:string()
//     .required("Phone is required")
//     .matches(
//      phoneRegex , 
//      "Sorry , We Accept Egyption Phone Numbers Only"
//     ),
//  });

//  async function SendDataToRegister(values) {
//    const loadingToastId = toast.loading("Waiting ...")
//      try {
//          const options = {
//              url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
//              method:"POST",
//              data: values
//          };
//            // eslint-disable-next-line no-unused-vars
//            let {data} = await axios.request(options);
//            if(data.message === "success") {
//              toast.dismiss(loadingToastId)
//              toast.success("User created successfully");
//              setTimeout(()=> {
//                  navigate("/login")
//              },2000)
//            }
//      }
//      catch(error) {
//          toast.error(error.response.data.message)
//          setAccoutExistError(error.response.data.message)
//      } finally {
//          toast.dismiss(loadingToastId)
//      }
  

//  }

//  const formik = useFormik({
//   initialValues:{
//      "name": "",
//      "email":"",
//      "password":"",
//      "rePassword":"",
//      "phone":""
//   },

//   validationSchema,
 
//   onSubmit:SendDataToRegister,
//  });


//  return <>
//  <h1 className="text-xl font-semibold text-slate-700 mb-5">
//      <i className="fa-regular fa-user mr-2 "></i>Register Now
//  </h1>
//  <form className="space-y-3" onSubmit={formik.handleSubmit}>
   
//      <div className="name">
//          <input type="text" 
//          className="form-control w-full" 
//          placeholder="Type your name" 
//          value={formik.values.name}
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          name="name"
//           />
//           {formik.errors.name && 
//           formik.touched.name && 
//           <p className="text-red-500 text-sm mt-2">
//          *{formik.errors.name}</p>
//          }
//      </div>
   
//     <div className="email">
//          <input type="email" 
//          className="form-control w-full" 
//          placeholder="Email Address" 
//          value={formik.values.email}
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          name="email"
//           />
//           {formik.errors.email && 
//           formik.touched.email && 
//           <p className="text-red-500 text-sm mt-2"> 
//           *{formik.errors.email}</p>
//           }
//           {
//              accoutExistError && <p className="text-red-500 text-sm mt-2"> 
//               *{accoutExistError}</p>
//           }
          
//      </div>
   
//      <div className="password">
//          <input type="password" 
//          className="form-control w-full" 
//          placeholder="Password" 
//          value={formik.values.password}
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          name="password"
//           />
//           {formik.errors.password && 
//           formik.touched.password && 
//           <p className="text-red-500 mt-2 text-sm">
//              *{formik.errors.password}</p>
//          }
//      </div>
    
//      <div className="rePassword">
//          <input type="password" 
//          className="form-control w-full" 
//          placeholder="Confirm password" 
//          value={formik.values.rePassword}
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          name="rePassword"
//           />
//           {formik.errors.rePassword && 
//           formik.touched.rePassword && 
//           <p className="text-red-500 mt-2 text-sm">
//              *{formik.errors.rePassword}</p>
//          }
//      </div>
     
//      <div className="name">
//          <input type="tel" 
//          className="form-control w-full" 
//          placeholder="Phone Number" 
//          value={formik.values.phone}
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          name="phone"
//           />
//           {formik.errors.phone && 
//           formik.touched.phone && 
//           <p className="text-red-500 mt-2 text-sm">
//              *{formik.errors.phone}</p>
//          }
//      </div>
    
//      <button 
//      type="submit" 
//      className="btn w-full bg-primary-700 hover:bg-primary-800 text-white uppercase">
//          Sign Up</button>
 
//  </form>
//  </>