"use client";
import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/porto1.png",
    alt: "Gallery item 1",
    title: "Item 1",
  },
  {
    id: 2,
    src: "/porto2.png",
    alt: "Gallery item 2",
    title: "Item 2",
  },
  {
    id: 3,
    src: "/porto3.png",
    alt: "Gallery item 3",
    title: "Item 3",
  },
];

export default function Page() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setSelectedId(item.id)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {selectedId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedId(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedId(null)}
          >
            ✕
          </button>
          <Image
            src={galleryItems.find((item) => item.id === selectedId)?.src || ""}
            alt="Selected"
            width={800}
            height={600}
            className="max-w-4xl max-h-96 object-contain"
          />
        </div>
      )}
    </div>
  );
}
