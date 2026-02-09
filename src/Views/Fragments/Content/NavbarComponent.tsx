"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import MobileToggle from "@/Views/components/MobileToggle";
import Image from "next/image";
import Link from "next/link";

type User = {
  id: string;
  role: "admin" | "user";
}[];

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  const handleNav = (name: string) => {
    document
      .getElementById(
        name === "Layanan"
          ? "services"
          : name === "Galeri"
          ? "gallery"
          : "contact"
      )
      ?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navLinks = ["Layanan", "Galeri", "Lokasi"];

  return (
    <header>
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl py-3 shadow">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/logo.png" alt="logo" width={48} height={48} />
            <span className="font-black text-md md:text-2xl">CAPSTER_ADP</span>
          </div>

          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((name: string) => (
              <p
                key={name}
                onClick={() => handleNav(name)}
                className="cursor-pointer font-bold hover:text-red-600"
              >
                {name}
              </p>
            ))}

            <a
              href="https://wa.me/6285702260407"
              target="_blank"
              className="font-bold"
            >
              Booking
            </a>
          </div>

          {!loading && !user && (
            <Link
              href="/login"
              className="bg-black px-4 py-2 rounded-xl text-white"
            >
              Login
            </Link>
          )}

          {!loading && user && (
            <Link
              href={
                user[0].role === "admin"
                  ? "/dashboard/admin-toko"
                  : "/dashboard/users"
              }
              className="bg-black md:px-4 md:py-2 rounded-xl text-white p-2"
            >
              Dashboard
            </Link>
          )}

          <MobileToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div className="">
          {isMenuOpen && (
            <div className="flex flex-col gap-10 items-center ">
              {navLinks.map((name) => (
                <p
                  key={name}
                  onClick={() => handleNav(name)}
                  className="cursor-pointer font-bold hover:text-red-600 "
                >
                  {name}
                </p>
              ))}

              <a
                href="https://wa.me/6285702260407"
                target="_blank"
                className="font-bold"
              >
                Booking
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
