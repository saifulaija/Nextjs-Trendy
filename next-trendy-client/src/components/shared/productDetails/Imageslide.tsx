// "use client";

// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import { type Swiper as SwiperTypes } from "swiper";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

// import "./imageSlide.css";

// // import required modules
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// type ImageSlideProps = {
//   images: string[];
// };

// export default function ImageSlide({ images }: ImageSlideProps) {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);

//   const handleSwiper = (swiper: SwiperTypes) => {
//     setThumbsSwiper(swiper);
//   };

//   const swiperStyle: React.CSSProperties = {
//     "--swiper-navigation-color": "#fff",
//     "--swiper-pagination-color": "#fff",
//   } as React.CSSProperties;

//   return (
//     <>
//       <Swiper
//         style={swiperStyle}
//         loop={true}
//         spaceBetween={10}
//         navigation={true}
//         thumbs={{ swiper: thumbsSwiper }}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="mySwiper2"
//       >
//         {images?.map((image: string, index: number) => (
//           <SwiperSlide key={index}>
//            <img src={image} alt="image" className="rounded-sm" />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <Swiper
//         onSwiper={handleSwiper}
//         loop={true}
//         spaceBetween={10}
//         slidesPerView={4}
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="mySwiper"
//       >
//         {images?.map((image: string, index: number) => (
//           <SwiperSlide key={index}>
//             <img src={image} alt="image" className="cursor-pointer rounded-sm"/>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }



"use client";

import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperTypes } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./imageSlide.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

type ImageSlideProps = {
  images: string[];
};

export default function ImageSlide({ images }: ImageSlideProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);

  const handleSwiper = (swiper: SwiperTypes) => {
    setThumbsSwiper(swiper);
  };

  const swiperStyle: React.CSSProperties = {
    "--swiper-navigation-color": "#fff",
    "--swiper-pagination-color": "#fff",
  } as React.CSSProperties;

  return (
    <>
      <Swiper
        style={swiperStyle}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <img src={image} alt="image" className="rounded-sm" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={handleSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt="image"
              className="cursor-pointer rounded-sm"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

