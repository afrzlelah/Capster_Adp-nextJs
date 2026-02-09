"use client";

import { getGallery } from "@/services/gallery.service";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";

interface DataGallery {
  id: string;
  name: string;
  image: string;
  description: string;
}

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(true);

  useEffect(() => {
    const f = async () => {
      setPhotos(await getGallery());
    };
    f();
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
    const potos = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BASE}/api/gallery?page=${nextPage}`
    );

    const response = await potos.json();
    const result = response.data;
    if (!result || result.length === 0) setHasLoadMore(false);
    if (result.length < 3) setHasLoadMore(false);
    setPhotos((prev) => [...prev, ...result]);
  };

  return (
    <section id="gallery" className="py-40 bg-white">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-6">
            Gallery Feed
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-none tracking-tight">
            Katalog Gaya Rambut Paling Tajam.
          </h3>
          <div className="w-32 h-2 bg-blue-600 mx-auto rounded-full shadow-[0_5px_15px_rgba(37,99,235,0.3)]"></div>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 space-y-10">
          {photos.map((item: DataGallery, i) => (
            <div
              key={i}
              className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] transition-all duration-700 hover:-translate-y-2"
            >
              <img
                src={item.image}
                alt="HD Haircut Result"
                className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-100  transition-opacity duration-500 flex items-end p-10">
                <div className="w-full flex justify-between items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-white">
                    <p className="text-[10px] font-black tracking-widest uppercase opacity-70">
                      {item.name}
                    </p>
                    <p className="text-xl font-black tracking-tight">
                      {item.description}
                    </p>
                  </div>
                  <a
                    href="https://www.instagram.com/capster_adp"
                    className="text-white bg-white/20 backdrop-blur-xl p-4 rounded-2xl hover:bg-blue-600 transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasLoadMore && (
          <button
            onClick={() => handleLoadMore()}
            className="mt-32 p-5 max-w-2xl rounded-2xl bg-slate-900 font-bold text-white cursor-pointer "
          >
            {loading ? "Sedang Memuat..." : " Load Gambar lebih banyak"}
          </button>
        )}
      </div>
    </section>
  );
};

export default Gallery;
