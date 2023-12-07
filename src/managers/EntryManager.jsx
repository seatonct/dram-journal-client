export const getAllEntries = async ({ token }) => {
  const res = await fetch("http://localhost:8000/entries", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const allEntries = res.json();
  return allEntries;
};
