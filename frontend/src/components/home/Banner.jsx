"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 hidden md:flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-2xl group/btn"
  >
    <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 hidden md:flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-2xl group/btn"
  >
    <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
  </button>
);

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/banner/allbanners`)
      .then((res) => {
        setBanners(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: i => (
      <div className="w-12 h-1 group relative py-4">
        <div className="w-full h-full bg-white/20 rounded-full overflow-hidden">
          <div className="dot-progress w-0 h-full bg-white transition-all duration-[6000ms] ease-linear"></div>
        </div>
      </div>
    ),
    appendDots: dots => (
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
        <ul className="flex items-center gap-4 m-0 p-0 banner-dots"> {dots} </ul>
      </div>
    )
  };

  if (loading) {
    return (
      <section className="relative w-full h-[70vh] md:h-[90vh] bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="relative bg-white overflow-hidden group">
      <Slider {...settings}>
        {banners.map((item, index) => (
          <div key={index} className="relative outline-none">
            <div className="w-full h-[75vh] md:h-[90vh] relative overflow-hidden">
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 transition-transform duration-[10000ms] ease-out group-hover:scale-110">
                <img
                  src={item.image}
                  alt="banner"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

              {/* Content Container */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-2xl text-white">
                    <div className="overflow-hidden mb-4">
                      <span className="block text-xs md:text-sm font-black uppercase tracking-[0.4em] animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                        New Season Arrival
                      </span>
                    </div>
                    
                    <div className="overflow-hidden mb-6">
                      <h1 
                        className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] italic"
                        dangerouslySetInnerHTML={{ __html: item.title || "Elite <br/> Collection" }}
                      />
                    </div>

                    <div className="overflow-hidden mb-10">
                      <p className="text-sm md:text-lg text-gray-300 max-w-lg animate-fade-in opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                        {item.subtitle || "Discover the intersection of high-performance materials and avant-garde design."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 animate-fade-in opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                      <Link 
                        href="/shop" 
                        className="px-8 md:px-12 py-4 md:py-5 bg-white text-black text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-full hover:bg-black hover:text-white transition-all duration-500 shadow-xl shadow-white/10 flex items-center gap-3 group/cta"
                      >
                        Explore Now
                        <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                      
                      <Link 
                        href="/collection" 
                        className="px-8 md:px-12 py-4 md:py-5 border border-white/30 text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-500"
                      >
                        Lookbook
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-10 right-10 hidden lg:block">
                 <div className="flex flex-col items-end gap-2 text-white/50">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">V.01 // 2024</span>
                    <div className="w-20 h-px bg-white/20"></div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .banner-dots .slick-active .dot-progress {
          width: 100% !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default Banner;

