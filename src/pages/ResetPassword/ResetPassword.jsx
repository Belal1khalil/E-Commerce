import axios from "axios";
import { useFormik } from "formik"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup"

export default function ResetPassword() {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const navigate = useNavigate()
   async function ResetPass(values) {
    const ToastId = toast.loading("Waiting......")
    try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            method:"PUT",
            data:values,
        }
              const {data} = await axios.request(options)
              toast.success("Reset Password successfully")
              setTimeout(() => {
                navigate("/login")
              }, 2000);
              console.log(data)
    } catch (error) {
        console.log(error)
    }finally {
        toast.dismiss(ToastId)
    }
   }
   
   
   const validationSchema = object({
       email:string()
       .required("Email is required")
       .email("Email is invalid"),
       newPassword:string()
       .required("Password is required")
       .matches(
         passwordRegex , 
         "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
          ),
      });
   
   
   const formik = useFormik({
    initialValues:{
        email:"",
        newPassword: ""
    },
    validationSchema,
    onSubmit:ResetPass,
   })
   return<>
    <h1 
    className="text-xl ml-3   text-slate-700 font-semibold mb-5">
        reset your account password
        </h1>
        <form className="space-y-3 ml-3" onSubmit={formik.handleSubmit} >
        <div className="email">
            <input 
            type="email" 
            placeholder="Email Address" 
            className="form-control w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            />
            {
               formik.errors.email&&
               formik.touched.email && <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.email}</p> 
            }
           
        </div>
        <div className="password">
            <input 
            type="password" 
            placeholder="Enter password" 
            className="form-control w-full"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="newPassword"
            />
            {formik.errors.newPassword &&
            formik.touched.newPassword && <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.newPassword}</p>
            }
             
        </div>
        <div>
         
        </div>
        <button type="submit" className="  w-fit btn font-bold uppercase bg-transparent border-2 border-primary-600 hover:text-white transition-all text-slate-400 hover:bg-primary-800 ">Reset Password</button>
        </form>
    </>
}