import { Plus, Trash2, X } from "lucide-react";
import { Suspense, use, useEffect, useState } from "react";
import Image from "next/image";
import { getGallery } from "@/services/gallery.service";
import Swal from "sweetalert2";

const Gallery = ({ gallery, setGallery, setAddGalleryFormStatus }: any) => {
  useEffect(() => {
    const g = async () => {
      setGallery(await getGallery());
    };
    g();
  }, []);
  const handleDeleteData = async (item: {
    id: number;
    name: string;
    description: string;
  }) => {
    const { id } = item;
    const warning = await Swal.fire({
      icon: "warning",
      title: "Yakin mau menghapus ini?",
      showConfirmButton: true,
      confirmButtonText: "yakin",
      showCancelButton: true,
      cancelButtonText: "Gajadi ah",
    });
    4;
    if (!(await warning).isConfirmed) return null;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BASE}/api/gallery?id=${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    if (!response.ok)
      return Swal.fire({
        icon: "error",
        text: "Gagal Menghapus",
        theme: "auto",
        confirmButtonText: "Okay",
      });
    Swal.fire({
      icon: "success",
      title: "Succesz",
      text: "Data berhasil dihapus",
      theme: "auto",
      confirmButtonText: "Okay",
    });
    setGallery(await getGallery());
    // setGallery(fetchGallery());
  };
  const handleAddGallery = () => setAddGalleryFormStatus(true);

  if (gallery.length <= 0 || !gallery)
    return <div className="p-10 text-center text-2xl">Memuat Galeri...</div>;

  return (
    <>
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery?.map((item: any) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
          >
            <Image
              height={360}
              width={360}
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-3">
              <p className="text-sm font-bold truncate">{item.name}</p>
              <p className="text-[10px] uppercase font-black text-indigo-500">
                {item.description}
              </p>
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-2  opacity-100 transition-opacity">
              <button
                onClick={() => handleDeleteData(item)}
                className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-full text-red-500 shadow-xl backdrop-blur-md"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {/* Placeholder Tambah Baru */}
        <button
          onClick={(e) => setAddGalleryFormStatus(true)}
          className="h-full min-h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all gap-2 bg-slate-50 dark:bg-slate-800/30"
        >
          <Plus size={32} />
          <span className="text-xs font-bold uppercase tracking-widest">
            Upload Baru
          </span>
        </button>
      </div>
    </>
  );
};

export default Gallery;
