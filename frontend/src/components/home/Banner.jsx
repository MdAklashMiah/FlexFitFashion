"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { ChevronRight, ChevronLeft, ArrowRight, Play, Square } from "lucide-react";
import Link from "next/link";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-12 top-1/2 -translate-y-1/2 z-30 w-16 h-16 hidden lg:flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-700 opacity-0 group-hover:opacity-100 shadow-[0_0_50px_rgba(0,0,0,0.3)] group/btn overflow-hidden"
  >
    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
    <ChevronRight className="w-6 h-6 relative z-10 group-hover/btn:scale-110 transition-transform" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-12 top-1/2 -translate-y-1/2 z-30 w-16 h-16 hidden lg:flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-700 opacity-0 group-hover:opacity-100 shadow-[0_0_50px_rgba(0,0,0,0.3)] group/btn overflow-hidden"
  >
    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
    <ChevronLeft className="w-6 h-6 relative z-10 group-hover/btn:scale-110 transition-transform" />
  </button>
);

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    speed: 1500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: false,
    beforeChange: (prev, next) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: i => (
      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentSlide ? "bg-white w-8" : "bg-white/30"}`} />
    ),
    appendDots: dots => (
      <div className="absolute bottom-12 right-12 md:right-24 flex items-center justify-end">
        <ul className="flex items-center gap-3 m-0 p-0"> {dots} </ul>
      </div>
    )
  };

  if (loading) {
    return (
      <section className="relative w-full h-screen bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 border-t-2 border-white/20 border-r-2 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white/50 animate-pulse">
              FF
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="relative bg-black overflow-hidden group h-screen">
      <Slider {...settings}>
        {banners.map((item, index) => (
          <div key={index} className="relative outline-none">
            <div className="w-full h-screen relative overflow-hidden">
              {/* Immersive Background with Parallax-like Zoom */}
              <div className={`absolute inset-0 transition-transform duration-[10000ms] ease-out ${currentSlide === index ? "scale-110" : "scale-100"}`}>
                <img
                  src={item.image}
                  alt="premium fashion banner"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Sophisticated Multi-layered Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
              
              {/* Content Grid */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-8 md:px-24">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-8 overflow-hidden">
                      <div className="w-12 h-px bg-white/40 animate-slide-right opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]"></div>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/70 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                        {index + 1} &mdash; {banners.length} // Edition
                      </span>
                    </div>
                    
                    <div className="mb-8">
                      <h1 
                        className="text-6xl md:text-[10rem] lg:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] text-white animate-fade-in-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards] italic mix-blend-difference"
                        style={{ textShadow: "0 20px 80px rgba(0,0,0,0.5)" }}
                        dangerouslySetInnerHTML={{ __html: item.title || "Elite<br/>Vision" }}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end gap-12 mt-12">
                      <div className="max-w-md animate-fade-in-up opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium mb-8">
                          {item.subtitle || "Exploring the boundaries of contemporary aesthetics through meticulously crafted silhouettes and avant-garde textures."}
                        </p>
                        
                        <div className="flex flex-wrap gap-6">
                          <Link 
                            href="/shop" 
                            className="relative overflow-hidden group/btn px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-sm transition-all duration-500 flex items-center gap-4"
                          >
                            <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white">Discover Collection</span>
                            <ArrowRight className="w-4 h-4 relative z-10 transition-all duration-500 group-hover/btn:text-white group-hover/btn:translate-x-1" />
                            <div className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                          </Link>

                          <Link 
                            href="/lookbook" 
                            className="px-10 py-5 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-sm hover:bg-white hover:text-black transition-all duration-700 backdrop-blur-sm"
                          >
                            View Lookbook
                          </Link>
                        </div>
                      </div>

                      {/* Vertical Socials/Meta */}
                      <div className="hidden lg:flex flex-col gap-6 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] animate-fade-in-up opacity-0 [animation-delay:900ms] [animation-fill-mode:forwards]">
                        <a href="#" className="hover:text-white transition-colors rotate-90 origin-left translate-x-4 mb-8">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors rotate-90 origin-left translate-x-4 mb-8">Facebook</a>
                        <a href="#" className="hover:text-white transition-colors rotate-90 origin-left translate-x-4">Pinterest</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute left-12 bottom-12 hidden md:block overflow-hidden">
                <div className="flex items-center gap-6 animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Scroll</span>
                    <div className="w-0.5 h-12 bg-white/20 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-hint"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scrollHint {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-right {
          animation: slideRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scroll-hint {
          animation: scrollHint 2s infinite ease-in-out;
        }
        .slick-dots {
          position: static !important;
          width: auto !important;
        }
        .slick-dots li {
          margin: 0 !important;
          width: auto !important;
          height: auto !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;
