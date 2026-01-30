"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Scissors,
  Image as ImageIcon,
  Calendar,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  LogOut,
  ChevronRight,
  TrendingUp,
  Users,
  Search,
  Icon,
} from "lucide-react";
import { UserDataSupabase } from "@/app/types/dataUserSupabase";

const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState("booking");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<UserDataSupabase | null>(null);

  useEffect(() => {
    const fetchingDataUser = async () => {
      const userData = await fetch(`http://localhost:3000/api/data`);
      const data = await userData.json();
      setUserData(data[0]);
    };
    fetchingDataUser();
  }, []);

  // --- Mock Data ---
  const [layanan, setLayanan] = useState([
    { id: 1, nama: "Gentlemen's Cut", harga: 50000, durasi: "45 min" },
    { id: 2, nama: "Beard Trim & Shape", harga: 30000, durasi: "20 min" },
    { id: 3, nama: "Hair Tattoo/Art", harga: 75000, durasi: "60 min" },
  ]);

  const [gallery, setGallery] = useState([
    {
      id: 1,
      judul: "Classic Pompadour",
      kategori: "Hairstyle",
      url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400",
    },
    {
      id: 2,
      judul: "Fade Masterpiece",
      kategori: "Hairstyle",
      url: "https://images.unsplash.com/photo-1621605815841-2dddb3a736a9?w=400",
    },
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Budi Santoso",
      layanan: "Gentlemen's Cut",
      tanggal: "2024-03-25",
      jam: "10:00",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Andi Wijaya",
      layanan: "Beard Trim",
      tanggal: "2024-03-25",
      jam: "11:30",
      status: "Confirmed",
    },
    {
      id: 3,
      customer: "Rian Ardiansyah",
      layanan: "Hair Tattoo",
      tanggal: "2024-03-26",
      jam: "14:00",
      status: "Completed",
    },
  ]);

  // --- Render Helpers ---
  const StatCard = ({
    icon,
    title,
    value,
    color,
  }: {
    icon: any;
    title: string;
    value: string;
    color: string;
  }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {/* <Icon className="w-6 h-6" /> */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Scissors className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Capster{" "}
              <span className="text-indigo-600 font-black italic text-[24px]">
                ADP
              </span>
            </span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("booking")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "booking" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
            >
              <Calendar size={20} /> Jadwal Booking
            </button>
            <button
              onClick={() => setActiveTab("layanan")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "layanan" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
            >
              <Scissors size={20} /> Kelola Layanan
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "gallery" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
            >
              <ImageIcon size={20} /> Gallery Product
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <button className="flex items-center gap-3 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 w-full px-4 py-3 rounded-xl transition-all">
            <LogOut size={20} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold capitalize">
            {activeTab === "booking"
              ? "Dashboard Admin"
              : activeTab === "layanan"
                ? "Daftar Layanan"
                : "Gallery Produk"}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 transition-all"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600">
              {userData?.username.substr(0, 2)}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Dashboard Summary (Hanya muncul di Tab Booking) */}
          {activeTab === "booking" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                icon={Users}
                title="Total Booking Hari Ini"
                value="12"
                color="bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
              />
              <StatCard
                icon={TrendingUp}
                title="Estimasi Pendapatan"
                value="Rp 850.000"
                color="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              />
              <StatCard
                icon={CheckCircle}
                title="Selesai"
                value="8"
                color="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
              />
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Action Bar */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Tampilan:
                </span>
                <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-bold px-3 py-1 outline-none cursor-pointer">
                  <option>Semua Data</option>
                  <option>Terbaru</option>
                  <option>Arsip</option>
                </select>
              </div>

              {(activeTab === "layanan" || activeTab === "gallery") && (
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                  <Plus size={18} />{" "}
                  {activeTab === "layanan" ? "Tambah Layanan" : "Upload Foto"}
                </button>
              )}
            </div>

            {/* Table / Content List */}
            <div className="overflow-x-auto">
              {activeTab === "booking" && (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Layanan
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Waktu
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {bookings.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {item.customer}
                          </div>
                          <div className="text-xs text-slate-500">
                            ID: #BK-{item.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {item.layanan}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold">
                          <div>{item.tanggal}</div>
                          <div className="text-indigo-600 dark:text-indigo-400">
                            {item.jam} WIB
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              item.status === "Completed"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : item.status === "Confirmed"
                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                                  : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors">
                              <CheckCircle size={18} />
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "layanan" && (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Nama Layanan
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Estimasi Durasi
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                        Harga
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {layanan.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold">{item.nama}</td>
                        <td className="px-6 py-4 text-slate-500">
                          {item.durasi}
                        </td>
                        <td className="px-6 py-4 font-black text-indigo-600 dark:text-indigo-400">
                          Rp {item.harga.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "gallery" && (
                <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                    >
                      <img
                        src={item.url}
                        alt={item.judul}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-3">
                        <p className="text-sm font-bold truncate">
                          {item.judul}
                        </p>
                        <p className="text-[10px] uppercase font-black text-indigo-500">
                          {item.kategori}
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-full text-red-500 shadow-xl backdrop-blur-md">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Placeholder Tambah Baru */}
                  <button className="h-full min-h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all gap-2 bg-slate-50 dark:bg-slate-800/30">
                    <Plus size={32} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Upload Baru
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
