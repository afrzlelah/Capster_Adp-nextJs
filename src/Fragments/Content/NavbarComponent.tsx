"use client";

import { useState } from "react";
import { Phone, X } from "lucide-react";
import MobileToggle from "@/components/MobileToggle";
import Image from "next/image";
const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNav = (linkName: string) => {
    const Gallery = document.getElementById("gallery");
    const services = document.getElementById("services");
    const contact = document.getElementById("contact");
    if (linkName === "Layanan")
      services?.scrollIntoView({ behavior: "smooth" });
    else if (linkName === "Lokasi")
      contact?.scrollIntoView({ behavior: "smooth" });
    else if (linkName === "Galeri")
      Gallery?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: "Layanan", href: "#services" },
    { name: "Galeri", href: "#gallery" },
    { name: "Lokasi", href: "#contact" },
  ];
  return (
    <header>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.05)] py-3`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* Logo ADP  */}
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black border border-slate-100 shadow-xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-red-500/10 to-blue-600/10"></div>
              <Image
                src="/logo.png"
                alt="logo"
                className="rounded-full"
                width={100}
                height={100}
              />
            </div>
            <span
              className={`font-black text-2xl tracking-tighter transition-colors duration-300 text-slate-900`}
            >
              CAPSTER_ADP
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <p
                key={link.name}
                onClick={() => handleNav(link.name)}
                className={`cursor-pointer font-bold text-sm uppercase tracking-widest hover:text-red-600 transition-all duration-300 text-slate-600`}
              >
                {link.name}
              </p>
            ))}
            <a
              href="https://wa.me/6285702260407"
              target="_blank"
              className="bg-black text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-gray-700 shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all active:scale-95"
            >
              Booking
            </a>
          </div>

          {/* Mobile Toggle */}
          <MobileToggle />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white shadow-2xl p-10 flex flex-col justify-center gap-8 md:hidden animate-in fade-in zoom-in duration-300">
            <button
              className="absolute top-8 right-8 text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-900 font-black text-4xl tracking-tighter"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-red-600 text-white p-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-red-200 mt-10">
              <Phone size={24} /> WHATSAPP
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavbarComponent;
