import axios from "axios";
import CardCat from "../../Components/Category/Category Card";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

 export default function Category() {
   
   async function GetCategories() {
 
    const options = {
        url :"https://ecommerce.routemisr.com/api/v1/categories",
        method:"GET",
    }
      return axios.request(options);
   }
  
  let {data , isLoading} = useQuery({
     queryKey : ["categories"],
     queryFn: GetCategories,
     refetchOnMount:false,
     gcTime:10000, 
  })
 
  if(isLoading) return <Loading/>
   console.log(data)   
   return <>
   <Helmet>
    <title>Categorirs</title>
    <meta name="desctiption" content="FreshCart | Categories page , All Categories appear in this page"/>
   </Helmet>
     <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-4">
        {data.data.data.map((category)=>(
          <CardCat categoryInfo={category} key={category._id}/>
        ))}
     </div>
     
    </>
 }