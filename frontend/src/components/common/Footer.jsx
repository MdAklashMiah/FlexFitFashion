import Container from "./Container";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, CreditCard, Shield, Truck, HeadphonesIcon, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 pt-24 pb-12 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>
      
      <Container>
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-white/5 mb-20">
          <div className="flex items-start gap-5 group">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 border border-white/10 group-hover:scale-110">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-2">Fast Shipping</h4>
              <p className="text-xs leading-relaxed text-gray-500">Free delivery for all orders over $140. Express options available.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 border border-white/10 group-hover:scale-110">
              <HeadphonesIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-2">Expert Support</h4>
              <p className="text-xs leading-relaxed text-gray-500">Our friendly team is available 24/7 to help with any queries.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 border border-white/10 group-hover:scale-110">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-2">Secure Payment</h4>
              <p className="text-xs leading-relaxed text-gray-500">Your data is encrypted and protected with industry standards.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 border border-white/10 group-hover:scale-110">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-2">Easy Returns</h4>
              <p className="text-xs leading-relaxed text-gray-500">30-day money-back guarantee for a stress-free experience.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block group">
              <img 
                src="/images/logo.png" 
                alt="FlexFitFashion" 
                className="h-10 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="text-sm leading-8 text-gray-500 max-w-sm">
              Redefining contemporary style with premium quality materials and avant-garde designs. Join the elite community of fashion forward individuals.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 text-sm text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>1418 River Drive, Suite 35 Cottonhall, CA 9622</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 246-345-0695</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@flexfitfashion.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10">Collections</h4>
            <ul className="space-y-4">
              {["New Arrivals", "Best Sellers", "Men's Collection", "Women's Collection", "Accessories"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-px bg-white transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Our Story", "Sustainability", "Careers", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="/contact" className="text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-px bg-white transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <div className="p-8 lg:p-10 bg-white/[0.03] border border-white/5 rounded-[40px] relative overflow-hidden group/card">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover/card:bg-white/10 transition-colors"></div>
              
              <h4 className="text-white text-xl font-black uppercase tracking-tight mb-4 italic">Join the Elite</h4>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Subscribe to receive early access to new drops and exclusive member-only collections.
              </p>

              <form className="relative">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl text-sm outline-none focus:border-white/30 transition-all placeholder:text-gray-600"
                  required
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-10 flex items-center gap-6">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:scale-110">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[11px] font-medium uppercase tracking-[0.1em] text-gray-600">
            <p>© {new Date().getFullYear()} FlexFitFashion. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-40 hover:opacity-80 transition-opacity">
            <img src="/images/payment/visa.png" alt="Visa" className="h-4 w-auto grayscale brightness-200" />
            <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-4 w-auto grayscale brightness-200" />
            <img src="/images/payment/PayPal.png" alt="PayPal" className="h-4 w-auto grayscale brightness-200" />
            <img src="/images/payment/Stripe.png" alt="Stripe" className="h-4 w-auto grayscale brightness-200" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
