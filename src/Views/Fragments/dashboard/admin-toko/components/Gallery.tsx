import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormAddGallery from "./FormAddGallery";

const Gallery = ({ isLoading, setIsLoading }: any) => {
  const [gallery, setGallery] = useState([]);
  const [addGalleryForm, setAddGalleryForm] = useState(false);

  const fetchGallery = async () => {
    const response = await fetch(`http://localhost:3000/api/gallery`);
    const result = await response.json();
    setGallery(result.data);
  };
  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddGallery = () => {
    setAddGalleryForm(true);
  };
  const handleSubmitAddGallery = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("description", e.target.description.value);
      formData.append("image", e.target.image.files[0]);

      const response = await fetch(`http://localhost:3000/api/gallery`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result?.succes) {
        await Swal.fire({
          icon: "error",
          title: "Upload Gagal!",
          text: result.message,
          confirmButtonText: "Paham",
        });
        return;
      }

      const ress = await Swal.fire({
        icon: "success",
        title: "Succes",
        text: "Data berhasil ditambahkan",
        confirmButtonText: "Okay",
      });

      if (ress.isConfirmed) {
        await fetchGallery();
      }
    } finally {
      setAddGalleryForm(false);
      setIsLoading(false);
    }
  };

  const handleDeleteData = async (item) => {
    const { id } = item;
    const confrim = await Swal.fire({
      icon: "question",
      title: " Hapus data?",
      text: "Apakah Anda Yakin Ingin Menghapus Data Ini?",
      theme: "auto",
      showCancelButton: true,
      cancelButtonText: "Tidak Jadi",
      confirmButtonText: "Yakin",
    });
    if (!confrim.isConfirmed) return null;
    const resonse = await fetch(`http://localhost:3000/api/gallery?id=${id}`, {
      method: "DELETE",
    });
    const result = await resonse.json();
    if (result.succes === false)
      return Swal.fire({
        icon: "error",
        title: "Gagal Menghapus Data",
        text: result.message,
        theme: "auto",
        confirmButtonText: "Paham",
      });
    Swal.fire({
      icon: "success",
      title: "Berhasil Menghapus Data",
      text: result.message,
      theme: "auto",
      confirmButtonText: "Ok",
    });
    fetchGallery();
  };

  return (
    <>
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item: any) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
          >
            <img
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
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
          onClick={(e) => handleAddGallery(e)}
          className="h-full min-h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all gap-2 bg-slate-50 dark:bg-slate-800/30"
        >
          <Plus size={32} />
          <span className="text-xs font-bold uppercase tracking-widest">
            Upload Baru
          </span>
        </button>
        {addGalleryForm && (
          <FormAddGallery
            isLoading={isLoading}
            addGalleryForm={addGalleryForm}
            setAddGalleryForm={setAddGalleryForm}
            handleSubmitAddGallery={handleSubmitAddGallery}
          />
          // <div className="absolute bg-black/10 backdrop-blur-xl w-full top-0 left-0  h-full">
          //   <div className="flex justify-end">
          //     <button onClick={() => setAddGalleryForm(false)} className=" p-5">
          //       <X size={30} />
          //     </button>
          //   </div>
          //   <div className="bg-black/30 backdrop-blur-3xl h-auto flex lg:mx-34 my-10 rounded-4xl justify-center items-center ">
          //     <form onSubmit={(e) => handleSubmitAddGallery(e)}>
          //       <div className="flex flex-col justify-center items-center">
          //         <h4 className="font-extrabold text-4xl mt-20">
          //           Form Gallery
          //         </h4>
          //         <p className="text-gray-300 mt-5">
          //           Formulisr data postingan gallery
          //         </p>
          //       </div>
          //       <div className="my-10">
          //         <div className="flex flex-col my-5">
          //           <label htmlFor="name" className="font-light">
          //             Nama
          //           </label>
          //           <input
          //             type="text"
          //             id="name"
          //             name="name"
          //             placeholder="Masukan Nama style"
          //             required
          //             className="py-3 px-3 border border-gray-500 rounded-xl mt-1"
          //           />
          //         </div>
          //         <div className="flex flex-col my-5">
          //           <label htmlFor="description" className="font-light">
          //             Deskripsi
          //           </label>
          //           <input
          //             type="text"
          //             id="description"
          //             name="description"
          //             placeholder="Masukan Deskripsi"
          //             required
          //             className="py-3 px-3 border border-gray-500 rounded-xl mt-1"
          //           />
          //         </div>
          //         <div className="flex flex-col ">
          //           <label htmlFor="image" className="font-light">
          //             Gambar
          //           </label>
          //           <input
          //             type="file"
          //             id="image"
          //             name="image"
          //             placeholder="Masukan Nama style"
          //             required
          //             className="py-3 px-3 border border-gray-500 rounded-xl mt-1"
          //           />
          //         </div>
          //         <div className="flex flex-col my-20">
          //           <button
          //             type="submit"
          //             className="bg-indigo-500 rounded-2xl p-3 text-white font-bold"
          //           >
          //             Submit
          //           </button>
          //         </div>
          //       </div>
          //     </form>
          //   </div>
          // </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
