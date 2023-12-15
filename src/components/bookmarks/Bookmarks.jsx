import { useEffect, useState } from "react";
import { deleteEntry, getEntriesByUsername } from "../../managers/EntryManager";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBookmarksByUsername,
  createBookmark,
  deleteBookmark,
} from "../../managers/BookmarkManager";

export const Bookmarks = ({ token }) => {
  const [bookmarkedEntries, setBookmaredEntries] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);

  const { username } = useParams();
  const navigate = useNavigate();

  const getAndSetUserBookmarks = async () => {
    const bookmarksArray = await getBookmarksByUsername(username);
    setUserBookmarks(bookmarksArray);
  };

  const getAndSetJournalEntries = async () => {
    const entryArray = await getEntriesByUsername(username);
    setJournalEntries(entryArray);
  };

  const handleDelete = async (entryId) => {
    await deleteEntry(entryId);
    await getAndSetJournalEntries();
  };

  useEffect(() => {
    getAndSetUserBookmarks().then(() => {
      getAndSetJournalEntries();
    });
  }, [token, username]);

  return (
    <>
      <h1 className=" text-2xl text-center">Welcome to Dram Journal</h1>
      {journalEntries.map((entry) => {
        return (
          <div key={entry.id} className="p-2 m-2 border-2">
            <section className="flex justify-between">
              <h2>{entry.whiskey}</h2>
              {userBookmarks.find((obj) => obj.entry === entry.id) ? (
                <i
                  onClick={async () => {
                    await deleteBookmark(
                      userBookmarks.find(
                        (bookmark) => bookmark.entry === entry.id
                      )
                    );
                    await getAndSetUserBookmarks();
                    await getAndSetJournalEntries();
                  }}
                  className="fa-solid fa-bookmark"
                ></i>
              ) : (
                <i
                  onClick={async () => {
                    await createBookmark({ entryId: entry.id });
                    await getAndSetUserBookmarks();
                    await getAndSetJournalEntries();
                  }}
                  className="fa-regular fa-bookmark"
                ></i>
              )}
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
