"use client";

import Container from "./Container";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, CreditCard, Shield, Truck, HeadphonesIcon, Mail, Phone, MapPin, ArrowRight, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F0F0F] text-neutral-400 pt-24 pb-12 overflow-hidden border-t border-neutral-900">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group">
              <img 
                src="/images/logo.png" 
                alt="FlexFitFashion" 
                className="h-14 w-auto brightness-0 invert opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" 
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-500 font-medium max-w-xs">
              Architecting the future of contemporary fashion through avant-garde minimalism and sustainable craftsmanship.
            </p>
            <div className="flex items-center gap-6 pt-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="text-neutral-700 hover:text-[#C5A059] transition-all hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Collection Links */}
          <div className="space-y-8">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
              Series <span className="w-8 h-px bg-[#C5A059]/30"></span>
            </h4>
            <ul className="space-y-4">
              {["New Arrivals", "Best Sellers", "Men's Edition", "Women's Edition", "Accessories"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-all duration-300 flex items-center gap-3 group">
                    <div className="w-0 h-px bg-[#C5A059] group-hover:w-4 transition-all duration-300"></div>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information Links */}
          <div className="space-y-8">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
              Maison <span className="w-8 h-px bg-[#C5A059]/30"></span>
            </h4>
            <ul className="space-y-4">
              {["About Us", "Sustainability", "Terms of Service", "Privacy Policy", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="/about-us" className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-all duration-300 flex items-center gap-3 group">
                    <div className="w-0 h-px bg-[#C5A059] group-hover:w-4 transition-all duration-300"></div>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Exclusive Access (Newsletter) */}
          <div className="space-y-8">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em]">The Circle</h4>
            <div className="space-y-6">
              <p className="text-xs text-neutral-500 uppercase tracking-widest leading-loose">
                Join the inner circle for early access and exclusive drops.
              </p>
              <form className="relative group">
                <input
                  type="email"
                  placeholder="ENTER EMAIL"
                  className="w-full bg-transparent border-b border-neutral-800 text-white pb-3 px-0 text-[10px] font-black tracking-[0.2em] outline-none focus:border-[#C5A059] transition-all placeholder:text-neutral-800"
                />
                <button className="absolute right-0 bottom-3 text-neutral-700 hover:text-[#C5A059] hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
            
            {/* Contact Snip */}
            <div className="pt-6 border-t border-neutral-900 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-neutral-600 hover:text-white transition-colors cursor-pointer group">
                <Mail className="w-3.5 h-3.5 group-hover:text-[#C5A059] transition-colors" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Concierge Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-neutral-900 mb-12">
          {[
            { icon: Truck, label: "Complimentary Delivery" },
            { icon: Shield, label: "Encrypted Transactions" },
            { icon: HeadphonesIcon, label: "24/7 Concierge" },
            { icon: CreditCard, label: "Secure Checkouts" }
          ].map((feat, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <feat.icon className="w-4 h-4 text-neutral-700 group-hover:text-[#C5A059] transition-colors duration-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 group-hover:text-neutral-100 transition-colors duration-500">{feat.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Legal Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-700">
            © {new Date().getFullYear()} FLEXFITFASHION ARCHIVES.
          </p>

          <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-700">
            <Link href="#" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS</Link>
            <Link href="#" className="hover:text-white transition-colors">COOKIES</Link>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-neutral-600 hover:text-white transition-all"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">BACK TO TOP</span>
            <div className="w-10 h-10 rounded-full border border-neutral-900 flex items-center justify-center group-hover:border-[#C5A059] transition-all">
              <ArrowUp className="w-4 h-4 group-hover:text-[#C5A059]" />
            </div>
          </button>
        </div>
      </Container>
    </footer>
  );
}




