import axios from "axios"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import Loading from "../Loading/Loading";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

 export default function CategorySlider() {
 
  async function CategorySlider() {
    const options = {
     url:"https://ecommerce.routemisr.com/api/v1/categories",
     method:"GET"
    }
    return axios.request(options);
  }
      
     let {data , isLoading}  = useQuery({
        queryKey:["Categories"],
        queryFn:CategorySlider,
        refetchOnMount:false
      })


    if(isLoading) return <Loading/>

  return <> 
  
   <section className="my-8">
      <h2 className="mb-5 font-semibold text-xl text-gray-600">
        Shop Popular Categories
      </h2>
      {data?.data?.data && (
        <Swiper
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // Adjust number of slides per view for different screen sizes
            320: {
              slidesPerView: 2, // For small screens like mobile devices
              spaceBetween: 10, // Space between slides
            },
            640: {
              slidesPerView: 3, // For slightly larger screens like small tablets
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 4, // For medium screens like tablets
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6, // For large screens like desktops
              spaceBetween: 30,
            },
          }}
        >
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h3 className="mt-2 text-center font-medium text-gray-800">
                {category.name}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  </>;
 }




















