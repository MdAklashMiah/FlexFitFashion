"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/category/allcategory`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-2">Discovery</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter italic">Essential <span className="text-gray-300">Series</span></h3>
          </div>
          <Link href="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:text-black transition-all">
            <span>Explore Collection</span>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-12">
          {loading ? (
             [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="flex flex-col items-center gap-4">
                   <div className="w-24 h-24 rounded-full bg-gray-50 animate-pulse" />
                   <div className="h-2 w-12 bg-gray-50 rounded animate-pulse" />
                </div>
             ))
          ) : categories.map((item) => {
            return (
              <Link 
                key={item._id} 
                href={`/shop?category=${item._id}`}
                className="group flex flex-col items-center gap-5"
              >
                {/* Compact Circular Card */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 group/card">
                  {/* Luxury Outer Halo */}
                  <div className="absolute -inset-2 rounded-full border border-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100" />
                  
                  {/* Main Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-100 bg-gray-50 transition-all duration-700 group-hover:border-black shadow-sm group-hover:shadow-2xl group-hover:shadow-black/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115 grayscale-[0.3] group-hover:grayscale-0"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Floating Indicator */}
                  <div className="absolute -right-1 -top-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-lg">
                    <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                  </div>
                </div>

                {/* Minimalist Label */}
                <div className="text-center space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors duration-500">
                    {item.name}
                  </h4>
                  <div className="w-0 h-[1.5px] bg-black mx-auto group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TopCategories;


