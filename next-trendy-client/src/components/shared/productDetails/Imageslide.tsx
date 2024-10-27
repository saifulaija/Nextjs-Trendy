
"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperTypes } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

type ImageSlideProps = {
  images: string[];
};

export default function ImageSlide({ images }: ImageSlideProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Reset activeIndex when images change
    setActiveIndex(0);
  }, [images]);

  const handleSlideChange = (swiper: SwiperTypes) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-start gap-4 w-full">
      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        onSlideChange={handleSlideChange} // Track active slide
        direction="horizontal" // Default to horizontal on small screens
        slidesPerView={4}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full md:w-1/5 h-24 md:h-[500px] overflow-x-auto md:overflow-y-auto"
        style={{
          overflowX: "auto",
          overflowY: window.innerWidth >= 768 ? "auto" : "hidden", // Adjust overflow based on screen width
        }}
        breakpoints={{
          768: {
            direction: "vertical", // Switch to vertical scrolling on medium and larger screens
            slidesPerView: 4, // Keep the same number of slides visible
            spaceBetween: 10,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`thumbnail-${index}`}
              className={`object-cover w-full h-20 md:h-24 rounded-lg cursor-pointer transition-transform transform hover:scale-90 duration-300 ${
                activeIndex === index
                  ? "bg-opacity-100"
                  : "opacity-60"
              }`}
              style={{
                backgroundColor: activeIndex === index ? "#ffffff" : "#cccccc",
              }} // Set different background color for active slide
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Image Swiper */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full md:w-4/5 h-[300px] md:h-[500px] rounded-lg"
        onSlideChange={handleSlideChange} 
        
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`image-${index}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

