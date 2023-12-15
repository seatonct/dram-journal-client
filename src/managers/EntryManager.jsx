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

export const getUserEntries = async (username) => {
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

// Delete the following function if plan with one above works
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

export const getAllTypes = async () => {
  const res = await fetch(`http://localhost:8000/types`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const types = res.json();
  return types;
};

export const getAllColors = async () => {
  const res = await fetch(`http://localhost:8000/colors`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const colors = res.json();
  return colors;
};

export const getAllRatings = async () => {
  const res = await fetch(`http://localhost:8000/ratings`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const ratings = res.json();
  return ratings;
};

export const createEntry = async (newEntry) => {
  const res = await fetch(`http://localhost:8000/entries`, {
    body: JSON.stringify(newEntry),
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const created = res.json();
  return created;
};

export const deleteEntry = async (entryId) => {
  await fetch(`http://localhost:8000/entries/${entryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const getEntryById = async (entryId) => {
  const res = await fetch(`http://localhost:8000/entries/${entryId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const entry = res.json();
  return entry;
};

export const UpdateEntry = async (updatedEntry) => {
  const res = await fetch(`http://localhost:8000/entries/${updatedEntry.id}`, {
    body: JSON.stringify(updatedEntry),
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const getBookmarkedEntries = async (userId) => {
  const res = await fetch(
    `http://localhost:8000/entries?bookmarkUser=${userId}`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const bookmarkedEntries = res.json();
  return bookmarkedEntries;
};
