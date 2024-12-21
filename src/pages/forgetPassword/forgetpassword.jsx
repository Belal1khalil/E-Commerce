import axios from "axios"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { object, string } from "yup"

export default function Forget() {
    const navigate = useNavigate();


    async function forgetpass(values) {
    const toastid = toast.loading("Waiting.....");
   
   try {
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method:"POST",
        data:values,
    }
    const {data} = await axios.request(options);
    if(data.statusMsg === "success") {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/verfiycode")
      }, 2000);
    }
   } catch (error) {
    console.log(error)
   }finally {
    toast.dismiss(toastid)
   }
}

const validationSchema = object({
    email:string()
    .required("Email is required")
    .email("Email is invalid"),
   })
  const formik =  useFormik({
    initialValues:{
        email:""
    },
    validationSchema,
    onSubmit:forgetpass
  })
    return <>
    <h1 className="text-xl ml-3  font-semibold text-slate-500">Please enter your email :</h1>
    <form className=" mt-5 space-y-3" onSubmit={formik.handleSubmit}>
        <div className="email">
            <input 
            type="email" 
            placeholder="Email Address" 
            className="form-control w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            />
        </div>
        <div>
        </div>
        <button type="submit" className=" ml-3 w-fit btn font-bold uppercase bg-transparent border-2 border-primary-600 hover:text-white transition-all text-slate-400 hover:bg-primary-800 ">Verify</button>
        </form>
    </>
}