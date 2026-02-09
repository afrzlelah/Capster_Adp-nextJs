import { useState } from "react";
import Swal from "sweetalert2";
import { getGallery } from "@/services/gallery.service";
import { getServices } from "@/services/services.service";
import FormGalleryAdd from "./FormGalleryAdd";
import FormServiceAdd from "./FormServiceAdd";

const FormAddGallery = ({
  form,
  statusForm,
  setData,
}: {
  form: string;
  statusForm: any;
  setData: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitAddGallery = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("description", e.target.description.value);
      formData.append("image", e.target.image.files[0]);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BASE}/api/${form}`,
        {
          method: "POST",
          body: formData,
        }
      );

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
        const set =
          form === "gallery" ? await getGallery() : await getServices();
        setData(await set);
        // setData(getGallery());
      }
    } finally {
      statusForm(false);
      setIsLoading(false);
    }
  };
  const handleSubmitAddService = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BASE}/api/services`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, price: Number(price) }),
      }
    ).then((result) => result.json());
    // if (await response.succes) console.log("ok");
    setData(await getServices());
    setIsLoading(false);
    statusForm(false);
    if (await response.success)
      return Swal.fire({
        title: "Succes add layanan",
        icon: "success",
        theme: "auto",
      });
    Swal.fire({
      title: "Gagal menambahkan layanan",
      icon: "error",
      theme: "auto",
    });
  };
  const Template =
    form === "gallery" ? (
      <FormGalleryAdd
        handleSubmitAddGallery={handleSubmitAddGallery}
        isLoading={isLoading}
        statusForm={statusForm}
      />
    ) : (
      <FormServiceAdd
        statusForm={statusForm}
        handleSubmitAddService={handleSubmitAddService}
        isLoading={isLoading}
      />
    );

  return Template;
};

export default FormAddGallery;
