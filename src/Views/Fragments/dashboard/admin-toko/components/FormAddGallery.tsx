import { X } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { getGallery } from "@/services/gallery.services";
import { useRouter } from "next/navigation";

const FormAddGallery = ({ setAddGalleryFormStatus, setGallery }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

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
        theme: "auto",
        confirmButtonText: "Okay",
      });

      if (ress.isConfirmed) {
        setGallery(await getGallery());
        // setGallery(getGallery());
      }
    } finally {
      setAddGalleryFormStatus(false);
      setIsLoading(false);
    }
  };
  return (
    <div className="absolute bg-black/10 backdrop-blur-xl w-full top-0 left-0  h-full">
      <div className="flex justify-end">
        <button onClick={() => setAddGalleryFormStatus(false)} className=" p-5">
          <X size={30} />
        </button>
      </div>
      <div className="bg-black/30 backdrop-blur-3xl h-auto flex lg:mx-34 my-10 rounded-4xl justify-center items-center ">
        <form onSubmit={(e) => handleSubmitAddGallery(e)}>
          <div className="flex flex-col justify-center items-center">
            <h4 className="font-extrabold text-4xl mt-20">Form Gallery</h4>
            <p className="text-gray-300 mt-5">
              Formulisr data postingan gallery
            </p>
          </div>
          <div className="my-10">
            <div className="flex flex-col my-5">
              <label htmlFor="name" className="font-light">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Masukan Nama style"
                required
                className="py-3 px-3 border border-gray-500 rounded-xl mt-1"
              />
            </div>
            <div className="flex flex-col my-5">
              <label htmlFor="description" className="font-light">
                Deskripsi
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Masukan Deskripsi"
                required
                className="py-3 px-3 border border-gray-500 rounded-xl mt-1"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="image" className="font-light">
                Gambar
              </label>
              <input
                type="file"
                id="image"
                name="image"
                placeholder="Masukan Nama style"
                required
                className="py-3 px-3 border border-gray-500 rounded-xl mt-1"
              />
            </div>
            <div className="flex flex-col my-20">
              <button
                disabled={isLoading}
                type="submit"
                className={`rounded-2xl p-3 text-white font-bold transition 
  ${
    isLoading
      ? "bg-indigo-900 opacity-60 cursor-not-allowed"
      : "bg-indigo-500 hover:bg-indigo-600"
  }
`}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddGallery;
