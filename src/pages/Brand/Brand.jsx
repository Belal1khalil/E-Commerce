import axios from "axios";
import BrandCard from "../../Components/Brands/BrandCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brand () {
    async function getBrands() {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/brands",
            method:"GET"
        }
        return axios.request(options)
    } 

    let{data , isLoading} = useQuery({
        queryKey:"Brands",
        queryFn:getBrands
    })
    console.log(data)
    if(isLoading) return <Loading/>

    return <>
    <Helmet>
        <title>Brands</title>
    </Helmet>
    <h1 className="text-3xl font-semibold text-center my-6 text-primary-500 ">All Brands</h1>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {data.data.data.map((Brand)=>(
       <BrandCard BrandInfo={Brand} key={Brand._id}/>
    )) }
    </div>
    </>
}