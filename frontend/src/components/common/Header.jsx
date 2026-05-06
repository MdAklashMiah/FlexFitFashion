"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, Heart, ShoppingCart, X, Shield, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import Container from "./Container";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";
import { useSelector } from "react-redux";

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const user = useSelector((state) => state?.userInfo?.value);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC key closes modal & mobile menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "COLLECTION", path: "/collection" },
    { name: "CONTACT", path: "/contact" },
    { name: "ABOUT US", path: "/about-us" }
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-[999] transition-all duration-700 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl py-2 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100/50" 
            : "bg-white py-5 border-b border-gray-50"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between px-4 sm:px-6">
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="p-2 -ml-2 text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="relative z-10 shrink-0 group">
              <img
                src="/images/logo.png"
                alt="FlexFitFashion"
                className={`transition-all duration-700 object-contain ${
                  scrolled ? "h-14" : "h-16 md:h-20"
                } w-auto group-hover:scale-105`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500 group py-2 ${
                    isActive(link.path) ? "text-black" : "text-gray-400 hover:text-black"
                  }`}
                >
                  {link.name}
                  {/* Elegant Active Indicator */}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black transition-all duration-500 ${
                    isActive(link.path) ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-8 text-gray-900">
              {/* User/Account */}
              {user ? (
                <Link href="/dashboard" className="hidden md:flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 overflow-hidden">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Account</span>
                    <span className="text-[10px] font-bold truncate max-w-[80px]">{user.name}</span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="p-2 hover:bg-gray-50 rounded-full transition-colors group"
                >
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              )}

              {/* Wishlist */}
              <button className="hidden sm:block p-2 hover:bg-gray-50 rounded-full transition-colors group">
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-1.5 right-1.5 bg-black text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                  0
                </span>
              </Link>

              {user?.role === "admin" && (
                <Link href="/admin" className="hidden lg:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition shadow-xl shadow-black/10">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black tracking-widest uppercase">Console</span>
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar Integration */}
          <div className={`transition-all duration-700 overflow-hidden ${scrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"}`}>
            <div className="px-4 sm:px-6 py-4">
              <SearchBar />
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1001] lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl p-8 flex flex-col transform transition-transform duration-500">
            <div className="flex items-center justify-between mb-12">
              <img src="/images/logo.png" alt="logo" className="h-10 w-auto object-contain" />
              <button onClick={() => setMobileOpen(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between text-xs font-black tracking-[0.3em] uppercase ${
                    isActive(link.path) ? "text-black" : "text-gray-400"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4">
              {!user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20"
                >
                  Access Account
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-3 bg-gray-50 text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        openSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        openLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Header;

