import { useEffect, useState } from "react";
import { deleteEntry, getBookmarkedEntries } from "../../managers/EntryManager";
import { useNavigate } from "react-router-dom";
import {
  getBookmarksByUsername,
  deleteBookmark,
} from "../../managers/BookmarkManager";

export const Bookmarks = ({ currentUsername }) => {
  const [bookmarkedEntries, setBookmarkedEntries] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);

  const navigate = useNavigate();

  const getAndSetUserBookmarks = async () => {
    const bookmarksArray = await getBookmarksByUsername(currentUsername);
    setUserBookmarks(bookmarksArray);
  };

  const getAndSetBookmarkedEntries = async () => {
    const entryArray = await getBookmarkedEntries(userBookmarks[0].user);
    setBookmarkedEntries(entryArray);
  };

  const handleDelete = async (entryId) => {
    await deleteEntry(entryId);
    await getAndSetBookmarkedEntries();
  };

  useEffect(() => {
    if (currentUsername !== "undefined") {
      getAndSetUserBookmarks();
    }
  }, [currentUsername]);

  useEffect(() => {
    if (userBookmarks.length > 0) {
      getAndSetBookmarkedEntries(userBookmarks[0].user);
    }
  }, [userBookmarks]);

  return (
    <>
      <h1 className=" text-2xl text-center">Welcome to Dram Journal</h1>
      {bookmarkedEntries.map((entry) => {
        return (
          <div key={entry.id} className="p-2 m-2 border-2">
            <section className="flex justify-between">
              <h2>{entry.whiskey}</h2>
              <i
                onClick={async () => {
                  await deleteBookmark(
                    userBookmarks.find(
                      (bookmark) => bookmark.entry === entry.id
                    )
                  );
                  await getAndSetUserBookmarks();
                  if (userBookmarks.length > 0) {
                    await getAndSetBookmarkedEntries(userBookmarks[0].user);
                  }
                }}
                className="fa-solid fa-bookmark"
              ></i>
            </section>
            <p>Type: {entry.whiskey_type?.label}</p>
            {entry.part_of_country ? (
              <p>
                Origin: {entry.part_of_country}, {entry.country}
              </p>
            ) : (
              <p>Origin: {entry.country}</p>
            )}

            {entry.age_in_years > 0 ? (
              <p>Age: {parseInt(entry.age_in_years)} years</p>
            ) : (
              ""
            )}
            <p>Proof: {entry.proof}</p>
            {22 > entry.color.id > 0 ? (
              <div style={{ backgroundColor: `#${entry.color.hex_code}` }}>
                <p>
                  Color: {entry.color.color_grade} - {entry.color.label}
                </p>
                <div></div>
              </div>
            ) : (
              ""
            )}
            {entry.mash_bill ? <p>Mash Bill: {entry.mash_bill}</p> : ""}
            {entry.maturation_details ? (
              <p>Maturation Details: {entry.maturation_details}</p>
            ) : (
              ""
            )}
            <p>Nose: {entry.nose}</p>
            <p>Palate: {entry.palate}</p>
            {entry.finish ? <p>Finish: {entry.finish}</p> : ""}
            <p>
              Rating: {entry.rating.number_rating}/5 - {entry.rating.label}
            </p>
            {entry.notes ? <p>Notes: {entry.notes}</p> : ""}
            <p>
              From {entry.user.author_name}'s Dram Journal{" "}
              {entry.publication_date}
            </p>
            {entry.is_owner ? (
              <div className="flex justify-between my-2">
                <i
                  onClick={() => {
                    navigate(`/edit/${entry.id}`);
                  }}
                  className="fa-solid fa-pen-ruler"
                ></i>
                <i
                  onClick={() => {
                    handleDelete(entry.id);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};
