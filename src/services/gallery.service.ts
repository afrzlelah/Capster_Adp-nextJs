export const getGallery = async () => {
  const response = await fetch(`http://localhost:3000/api/gallery`).then(
    (result) => result.json()
  );
  return response.data;
};
