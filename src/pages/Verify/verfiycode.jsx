import axios from "axios"
import { useFormik } from "formik"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function Code() {
 const navigate = useNavigate()

 async function ResetCode(values) {
    const toastid = toast.loading("checking....")
   try {
    const options={
        url:"https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method:"POST",
        data:values,
    }
        const{data} = await axios.request(options);
        if(data.status === "Success") {
            toast.success("Success")
            setTimeout(() => {
                navigate("/reset-password")
            }, 2000);
        }
        console.log(data)
   } 
   catch (error) {
    console.log(error)
   }
   finally {
    toast.dismiss(toastid)
   }
 }



 
const formik = useFormik({
    initialValues:{
        resetCode:""
    },
    onSubmit:ResetCode,
})


    return<>
    <h1 className="text-xl ml-3  font-semibold text-slate-500">Reset your account password</h1>
    <form className=" mt-5 space-y-3" onSubmit={formik.handleSubmit} >
        <div className="email">
            <input 
            type="text" 
            placeholder="Code" 
            className="form-control w-full"
            name="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
        </div>
        <div>
        </div>
        <button type="submit" className=" ml-3 w-fit btn font-bold uppercase bg-transparent border-2 border-primary-600 hover:text-white transition-all text-slate-400 hover:bg-primary-800 ">Verify</button>
        </form>
    </>
}