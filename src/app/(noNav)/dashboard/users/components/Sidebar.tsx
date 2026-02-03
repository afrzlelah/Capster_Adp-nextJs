"use client";

import Alert from "@/Views/components/Alert";
import { History, LogOut, PlusCircle, Scissors, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const SidebarUser = () => {
  const { push }: any = useRouter();
  const [activeTab, setActiveTab] = useState<any | string>("overview");

  const handleLogout = async () => {
    await fetch(`http://localhost:3000/api/auth/logout`, { method: "POST" });
    Swal.fire({
      title: "Kami Tunggu!",
      text: "Dadaaaaa",
    });
    push("/");
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
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
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "overview" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
          >
            <User size={20} /> Beranda
          </button>
          <button
            onClick={() => setActiveTab("booking")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "booking" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
          >
            <PlusCircle size={20} /> Buat Janji
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "history" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
          >
            <History size={20} /> Riwayat
          </button>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800 hidden md:block">
        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 w-full px-4 py-3 rounded-xl transition-all"
        >
          <LogOut size={20} /> Keluar
        </button>
      </div>
    </aside>
  );
};

export default SidebarUser;
