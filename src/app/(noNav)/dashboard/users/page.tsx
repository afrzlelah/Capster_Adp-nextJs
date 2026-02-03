"use client";

import { UserDataSupabase } from "@/app/types/dataUserSupabase";
import {
  Calendar,
  Clock,
  History,
  User,
  Star,
  Scissors,
  ChevronRight,
  CreditCard,
  MapPin,
  Bell,
  LogOut,
  Gift,
  PlusCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import SidebarUser from "./components/Sidebar";
import HeaderUser from "./components/HeaderUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const DashboardUser = () => {
  const [userData, setUserData] = useState<UserDataSupabase | null>(null);
  console.log(userData);
  useEffect(() => {
    fetch(`http://localhost:3000/api/data`)
      .then((response) => response.json())
      .then((result) => setUserData(result[0]));
  }, []);

  const recentHistory = [
    {
      id: 1,
      service: "Beard Trim",
      date: "10 Feb 2024",
      price: "Rp 30.000",
      status: "Completed",
    },
    {
      id: 2,
      service: "Hair Tattoo",
      date: "15 Jan 2024",
      price: "Rp 75.000",
      status: "Completed",
    },
  ];

  const availablePromos = [
    {
      id: 1,
      title: "Potongan 10k",
      desc: "Berlaku untuk layanan Gentlemen's Cut",
      code: "CUT10K",
    },
    {
      id: 2,
      title: "Free Pomade",
      desc: "Tukarkan 500 poin untuk 1 Pomade",
      code: "REDEEM500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans text-slate-900 dark:text-slate-100">
      {/* Sidebar Pelanggan */}
      <SidebarUser />

      {/* Konten Utama */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {/* Header User */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <HeaderUser userData={userData} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Booking Aktif & Promo */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Card Aktif */}
            <section>
              {userData?.nextBooking && (
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="text-indigo-600" size={20} /> Booking Akan
                  Datang
                </h2>
              )}
              <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                      {userData?.nextBooking
                        ? "Konfirmasi Berhasil"
                        : "Welcome"}
                    </span>
                    <h3 className="text-2xl font-black">
                      {userData?.nextBooking?.services || "Booking sekarang!"}
                    </h3>
                    <div className="flex items-center gap-4 mt-4 opacity-90 text-sm font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} />{" "}
                        {userData?.nextBooking?.date ||
                          "Anda belum melakukan Booking"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} /> {userData?.nextBooking?.jam || "-"}{" "}
                        WIB
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      {userData?.nextBooking && (
                        <>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs uppercase">
                            {userData?.nextBooking?.barber.substr(0, 2)}
                          </div>
                          <span className="text-sm font-bold">
                            Barber: {userData?.nextBooking?.barber || ""}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all active:scale-95">
                    {userData?.nextBooking ? "Lihat Tiket" : "Booking Sekarang"}
                  </button>
                </div>
                {/* Dekorasi Background */}
                <Scissors className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10 -rotate-12" />
              </div>
            </section>

            {/* Quick Actions / Katalog Mini */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                  <PlusCircle size={24} />
                </div>
                <h4 className="font-bold text-lg">Booking Cepat</h4>
                <p className="text-slate-500 text-sm mt-1">
                  Pilih layanan favorit Anda dalam satu klik.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                  <Gift size={24} />
                </div>
                <h4 className="font-bold text-lg">Tukar Reward</h4>
                <p className="text-slate-500 text-sm mt-1">
                  Lihat hadiah menarik yang bisa ditukar poin.
                </p>
              </div>
            </section>
          </div>

          {/* Kolom Kanan: Promo & Riwayat */}
          <div className="space-y-8">
            {/* Promo Khusus */}
            <section>
              <h2 className="text-lg font-bold mb-4">Promo Spesial</h2>
              <div className="space-y-4">
                {availablePromos.map((promo) => (
                  <div
                    key={promo.id}
                    className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800"
                  >
                    <h4 className="font-black text-indigo-600 dark:text-indigo-400">
                      {promo.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{promo.desc}</p>
                    <div className="mt-3 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg flex justify-between items-center">
                      <span className="font-mono font-bold text-sm tracking-widest">
                        {promo.code}
                      </span>
                      <button className="text-[10px] font-black uppercase text-indigo-600">
                        Salin
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Riwayat Terakhir */}
            <section>
              <h2 className="text-lg font-bold mb-4">Riwayat Terakhir</h2>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {recentHistory.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-4 flex items-center gap-4 ${idx !== recentHistory.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <History size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold truncate">
                        {item.service}
                      </p>
                      <p className="text-[10px] text-slate-400">{item.date}</p>
                    </div>
                    <p className="text-sm font-black">{item.price}</p>
                  </div>
                ))}
                <button className="w-full py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border-t border-slate-100 dark:border-slate-800">
                  Lihat Semua Riwayat
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardUser;
