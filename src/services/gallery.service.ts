export const getGallery = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE}/api/gallery`
  ).then((result) => result.json());
  return response.data;
};
