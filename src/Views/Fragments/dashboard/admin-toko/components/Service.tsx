"use client";

import { getServices } from "@/services/services.service";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Service = ({ layanan, setLayanan }) => {
  useEffect(() => {
    const p = async () => setLayanan(await getServices());
    p();
  }, []);

  if (layanan.length <= 0)
    return <div className="p-5 text-center text-sm">Memuat Layanan...</div>;

  interface IServices {
    id: number;
    name: string;
    description: string;
    waktu: string;
    price: number;
  }

  const handleDeleteService = async (e, service) => {
    e.preventDefault();
    const { id } = service;
    const alert = await Swal.fire({
      title: "Yakin mau hapus?",
      icon: "question",
      theme: "auto",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yakin lah",
      cancelButtonText: "gak jadi",
    });

    if (!alert.isConfirmed) return null;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BASE}/api/services?id=${id}`,
      {
        method: "DELETE",
      }
    ).then((r) => r.json());
    if (!response.success)
      return Swal.fire({
        icon: "error",
        text: "Gagal Menghapus",
        theme: "auto",
        confirmButtonText: "Okay",
      });
    setLayanan(await getServices());
    Swal.fire({
      icon: "success",
      title: "Succesz",
      text: "Data berhasil dihapus",
      theme: "auto",
      confirmButtonText: "Okay",
    });
  };
  return (
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
        {layanan?.map((service: IServices) => (
          <tr
            key={service.id}
            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <td className="px-6 py-4 font-bold">{service.name}</td>
            <td className="px-6 py-4 text-slate-500">{service.waktu}</td>
            <td className="px-6 py-4 font-black text-indigo-600 dark:text-indigo-400">
              Rp {service.price.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-right">
              <div className="inline-flex items-center gap-2">
                <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => handleDeleteService(e, service)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Service;
