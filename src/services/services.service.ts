export const getServices = async () => {
  const response = await fetch(`http://localhost:3000/api/services`).then(
    (result) => result.json()
  );
  return response;
};
