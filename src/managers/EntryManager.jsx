export const getAllEntries = async () => {
  const res = await fetch("http://localhost:8000/entries", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const allEntries = res.json();
  return allEntries;
};

export const getEntriesByUsername = async (username) => {
  const res = await fetch(
    `http://localhost:8000/entries?username=${username}`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const userEntries = res.json();
  return userEntries;
};
