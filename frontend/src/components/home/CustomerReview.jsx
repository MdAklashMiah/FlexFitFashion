"use client";

import Slider from "react-slick";
import Image from "next/image";
import { useState } from "react";
import Container from "../common/Container";
import { Quote, Star } from "lucide-react";

export default function CustomerReview() {
  const [active, setActive] = useState(0);

  const reviews = [
    {
      id: 1,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adam",
      name: "Adam Johnson",
      role: "Verified Buyer",
      message: "The attention to detail in their pieces is remarkable. Every stitch feels intentional and high-end.",
    },
    {
      id: 2,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      name: "Sarah Parker",
      role: "Style Enthusiast",
      message: "Finally, a brand that balances avant-garde design with wearable comfort. A true fashion breakthrough.",
    },
    {
      id: 3,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
      name: "Daniel White",
      role: "Collector",
      message: "FlexFitFashion has redefined my wardrobe. The materials are premium and the service is unmatched.",
    },
    {
      id: 4,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      name: "Michael Chen",
      role: "Verified Buyer",
      message: "The most seamless shopping experience I've had in years. The packaging alone is a work of art.",
    },
    {
      id: 5,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      name: "Emma Wilson",
      role: "Verified Buyer",
      message: "Ethical sourcing meet luxury aesthetics. This is exactly what the modern fashion industry needs.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    focusOnSelect: true,
    beforeChange: (_, next) => setActive(next),

    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
    ],

    appendDots: (dots) => (
      <div className="mt-12">
        <ul className="flex justify-center gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className={`w-8 h-1 transition-all duration-500 rounded-full ${i === active ? "bg-black w-12" : "bg-gray-200"}`} />
    ),
  };

  return (
    <section className="py-32 bg-[#F9F9F9] relative overflow-hidden">
      {/* Aurora Background Blobs */}
      <div className="absolute top-0 -left-24 w-96 h-96 bg-gray-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-gray-100 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-20 relative z-10 px-6">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-4 block">Testimonials</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter italic">
          Voices of the <span className="text-gray-300">Circle</span>
        </h2>
      </div>

      <Container>
        <div className="relative z-10 px-4">
          <Slider {...settings} className="review-slider">
            {reviews.map((r, i) => (
              <div key={r.id} className="outline-none py-10 transition-all duration-700">
                <div
                  className={`
                    relative bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 md:p-12 text-center transition-all duration-1000 group
                    ${
                      active === i
                        ? "scale-110 opacity-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] z-20"
                        : "scale-90 opacity-40 blur-[2px] pointer-events-none"
                    }
                  `}
                >
                  {/* Glassmorphism Icon */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Quote className="w-5 h-5 fill-white" />
                  </div>

                  <div className="flex justify-center mb-8">
                    <div className="relative p-1 border border-gray-100 rounded-full">
                      <Image
                        src={r.img}
                        width={90}
                        height={90}
                        alt={r.name}
                        className="rounded-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-black text-black" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-8 italic">
                    "{r.message}"
                  </p>

                  <div className="space-y-1">
                    <h3 className="font-black text-xs uppercase tracking-[0.3em] text-black">{r.name}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>

      <style jsx global>{`
        .review-slider .slick-list {
          overflow: visible !important;
        }
        .review-slider .slick-track {
          display: flex !important;
          align-items: center !important;
        }
        .review-slider .slick-dots li {
          width: auto !important;
          height: auto !important;
          margin: 0 !important;
        }
      `}</style>
    </section>
  );
}

