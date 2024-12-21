import axios from "axios";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/Category.slider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
async function getProducts() {
  const options = {
  url:"https://ecommerce.routemisr.com/api/v1/products",
  metthod:"GET",
  }
     return axios.request(options)
  
}

   let {data , isLoading} = useQuery({
     queryKey:["products"],
     queryFn: getProducts,
     refetchOnMount:false,
     gcTime:10000, 
   })

 if(isLoading) return <Loading/>
    return (
    <>
    <Helmet>
      <title>Home Page </title>
      <meta name="desctiption" content="FreshCart | Home page , All products appear in this page"/>
      <meta name="keywords" content="E-commerce , FreshCart"/>
    </Helmet>
    <HomeSlider/>
    <CategorySlider/>
       <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-4">
       {  data.data.data.map((product)=> (
          <Card productInfo={product} key={product.id}/>
       )) }
     </div>
    </>
    )
 }