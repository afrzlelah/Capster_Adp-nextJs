export const getServices = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE}/api/services`
  ).then((result) => result.json());
  return response;
};
