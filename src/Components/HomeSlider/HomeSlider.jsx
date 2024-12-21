/* eslint-disable no-undef */
import image1 from "../../assets/imgs/slider-image-1.jpeg"
import image2 from "../../assets/imgs/slider-image-2.jpeg"
import image3 from "../../assets/imgs/slider-image-3.jpeg"
  
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from "swiper/modules";


export default function HomeSlider() {
   
    return <>
    
     <section className="grid grid-cols-12 mb-8">
        
         <div className="col-span-8">
            
          <Swiper style={{height:"100%"}} loop={true} 
           modules={[Autoplay]}
            autoplay={{
            delay: 2000, 
            disableOnInteraction: false, 
             }} 
             >
            <SwiperSlide style={{height:"100%"}}>
            <img src={image3}  className="w-full h-full object-cover rounded-sm" alt="" />
            </SwiperSlide>
            <SwiperSlide style={{height:"100%"}}>
            <img src={image2}  className="w-full h-full object-cover rounded-sm" alt="" />
            </SwiperSlide>
            <SwiperSlide style={{height:"100%"}}>
            <img src={image1}  className="w-full h-full object-cover rounded-sm" alt="" />
            </SwiperSlide>
          </Swiper>
         </div>

        <div className="col-span-4 bg-lime-400">
            <div className="h-1/2">
            <img src={image2} className="w-full h-full object-cover rounded-sm" alt="" />
            </div>
            <div className="h-1/2">
            <img src={image1} className="w-full h-full object-cover rounded-sm" alt="" />
            </div>
        </div>

     </section>
    </>
}

{/* <swiper-container style={{height:"100%"}} loop={true} >
<swiper-slide style={{height:"100%"}}>
<img src={image3}  className="w-full h-full object-cover" alt="" />
 </swiper-slide>
<swiper-slide style={{height:"100%"}}>
<img src={image2}  className="w-full h-full object-cover" alt="" />
</swiper-slide>
<swiper-slide style={{height:"100%"}}>
<img src={image1}  className="w-full h-full object-cover" alt="" />
</swiper-slide>  */}
{/* </swiper-container> */}