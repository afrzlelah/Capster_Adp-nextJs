"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [selectedId, setSelectedId] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const datas = await fetch(`http://localhost:3000/api/gallery`);
      const data = await datas.json();
      setGalleryItems(data.data);
    };
    fetching();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {galleryItems.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setSelectedId(item.id)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={500}
              height={500}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedId(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
            onClick={() => setSelectedId(false)}
          >
            ✕
          </button>
          {/* ilmu baru */}
          {galleryItems && (
            <Image
              src={
                galleryItems.find((item: any) => item.id === selectedId)
                  ?.image || "https://placehold.co/600x400/png"
              }
              alt="Selected"
              width={800}
              height={600}
              className="max-w-4xl max-h-96 object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
}
