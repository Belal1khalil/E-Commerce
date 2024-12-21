/* eslint-disable react/jsx-no-undef */
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";

import { CartContext } from "../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import Card from "../../Components/Card/Card";
import { Swiper , SwiperSlide } from "swiper/react";
import "Swiper/css";
import { Helmet } from "react-helmet";
import { Autoplay } from "swiper/modules";


export default function ProductDetails() {

   const [productDetails , setProductDetails] = useState(null)
   const {AddProductToCart}= useContext(CartContext)
   const [relatedproduct , setRelatedProduct] = useState(null)
   const { id } = useParams()
   
   async function GetProductsDetails() {
    const options ={
        url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method:"GET",
    };
      let {data} = await axios.request(options);
      console.log(data)
      setProductDetails(data.data);
   }

   async function GetRelatedProducts() {
     const options = {
        url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method:"GET",
     }
    let  {data} = await axios.request(options)
    console.log(data)
    setRelatedProduct(data.data)
   }

   //// inital , id
   useEffect(() => {
      GetProductsDetails();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   } , [id]);

   useEffect(()=>{
      // inital render + update state => productDetails
    if(productDetails == null) return;
         GetRelatedProducts();
   } , [productDetails])
  

  
return <>
  <Helmet>
   <title>Product details</title>
  </Helmet>
    { !productDetails ? <Loading/> : 
    <>
             <Helmet>
          <title>{productDetails.title}</title>
           </Helmet>
             <section className=" grid grid-col-1 gap-6 md:grid-cols-12  md:gap-12">
             <div className=" col-span-1 md:col-span-3">
             <ReactImageGallery 
             showPlayButton={false}
             showFullscreenButton={false}
             showNav={false}
                 items={productDetails.images.map((image)=> {
               return {original: image , thumbnail:image};
             })}
            />
        </div>

        <div className=" col-span-1 md:col-span-9 space-y-4">
        <div>
        <h2 className="text-2xl font-semibold text-gray-600 ml-2 md:ml-0">
         {productDetails.title}
         </h2>
           <h3 className="text-primary-800 font-semibold ml-2 md:ml-0">
           {productDetails.category.name }
            </h3>
           </div>
           <p className="text-gray-400 ml-2 md:ml-0 line-clamp-1">
            {productDetails.description}
            </p>
             <div className="flex justify-between items-center">
              <span className="font-semibold ml-2 md:ml-0">{productDetails.price} L.E</span>
           <div className=" space-x-1 mr-7 md:mr-0">
            <i className="fa-solid fa-star text-yellow-500 "></i>
            <span>{productDetails.ratingsAverage}</span>
               </div>
           </div>
 
        <button 
       onClick={()=>{
        AddProductToCart({productId : id})
        }}
        className="btn bg-primary-700 hover:bg-primary-800 transition-colors duration-300 cursor-pointer text-white w-full">ADD TO CART</button>
       </div>

             </section>
              <section>
                 <h2 className="text-lg md:text-2xl font-semibold text-gray-600 my-5 md:my-10">
                   Related Products
                 </h2>
                    <Swiper
                      spaceBetween={15}
                      modules={[Autoplay]}
                      autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                      }}
                            breakpoints={{
                              320: { slidesPerView: 1, spaceBetween: 10 },
                              640: { slidesPerView: 2, spaceBetween: 10 }, 
                              768: { slidesPerView: 3, spaceBetween: 15 }, 
                              1024: { slidesPerView: 4, spaceBetween: 15 }, 
                              1280: { slidesPerView: 6, spaceBetween: 15 }, 
                            }}
                          >
                              {relatedproduct?.length > 0 ? (
                                relatedproduct.map((product) => (
                                  <SwiperSlide key={product.id}>
                                    <Card productInfo={product} />
                                  </SwiperSlide>
                                ))
                              ) : (
                                <Loading />
                              )}
                            </Swiper>
              </section>
               </>
     }
</>
  
}



