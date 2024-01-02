export const getBookmarksByUsername = async (username) => {
  const res = await fetch(
    `http://localhost:8000/bookmarks?username=${username}`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const bookmarks = res.json();
  return bookmarks;
};

export const getBookmarksWithExpandedEntry = async (username) => {
  const res = await fetch(
    `http://localhost:8000/bookmarks?username=${username}&expand=entry`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const bookmarks = res.json();
  return bookmarks;
};

export const createBookmark = async (entryId) => {
  await fetch(`http://localhost:8000/bookmarks`, {
    body: JSON.stringify(entryId),
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const deleteBookmark = async (bookmark) => {
  await fetch(`http://localhost:8000/bookmarks/${bookmark.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
