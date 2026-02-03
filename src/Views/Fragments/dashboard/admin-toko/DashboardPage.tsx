"use client";

import React, { useEffect, useState } from "react";
import {
  Scissors,
  Image as ImageIcon,
  Calendar,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  LogOut,
  TrendingUp,
  Users,
  Search,
} from "lucide-react";
import { UserDataSupabase } from "@/app/types/dataUserSupabase";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Gallery from "./components/Gallery";
import FormAddGallery from "./components/FormAddGallery";
import Link from "next/link";
import Service from "./components/Service";
import { getService } from "@/services/service.service";

const DashboardAdmin = () => {
  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState("booking");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<UserDataSupabase | null>(null);
  const [addGalleryFormStatus, setAddGalleryFormStatus] = useState(false);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchingDataUser = async () => {
      const userData = await fetch(`http://localhost:3000/api/data`);
      const data = await userData.json();
      setUserData(data[0]);
    };
    fetchingDataUser();
  }, []);
  const handleLogout = async () => {
    await fetch(`http://localhost:3000/api/auth/logout`, { method: "POST" });
    Swal.fire({
      title: "Kami Tunggu!",
      text: "Dadaaaaa",
    });
    push("/");
  };

  const handleAddGallery = async () => {
    setAddGalleryFormStatus(true);
  };

  // --- Mock Data ---

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
            <Link href={"/"}>
              <span className="font-bold text-xl tracking-tight">
                Capster{" "}
                <span className="text-indigo-600 font-black italic text-[24px]">
                  ADP
                </span>
              </span>
            </Link>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("booking")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === "booking"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Calendar size={20} /> Jadwal Booking
            </button>
            <button
              onClick={() => setActiveTab("layanan")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === "layanan"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Scissors size={20} /> Kelola Layanan
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === "gallery"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <ImageIcon size={20} /> Gallery Product
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => handleLogout()}
            className="flex items-center gap-3 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 w-full px-4 py-3 rounded-xl transition-all"
          >
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
                <button
                  onClick={(e) =>
                    activeTab === "gallery" ? handleAddGallery() : ""
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
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

              {activeTab === "layanan" && <Service />}

              {activeTab === "gallery" && (
                <Gallery
                  gallery={gallery}
                  setGallery={setGallery}
                  addGalleryFormStatus={addGalleryFormStatus}
                  setAddGalleryFormStatus={setAddGalleryFormStatus}
                />
              )}
            </div>
          </div>
        </div>
        {addGalleryFormStatus && (
          <FormAddGallery
            gallery={gallery}
            setGallery={setGallery}
            addGalleryFormStatus={addGalleryFormStatus}
            setAddGalleryFormStatus={setAddGalleryFormStatus}
          />
        )}
      </main>
    </div>
  );
};

export default DashboardAdmin;
