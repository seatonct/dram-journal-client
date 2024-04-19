import { useEffect, useState } from "react";
import { deleteEntry, getEntriesByUsername } from "../../managers/EntryManager";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBookmarksByUsername,
  createBookmark,
  deleteBookmark,
} from "../../managers/BookmarkManager";

export const Journal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
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
  }, [username]);

  return (
    <>
      {/* Is this the current user's journal? */}
      {journalEntries[0]?.is_owner === false ? (
        // If not, then identify whose journal it is in the heading.
        <h1 className=" m-10 text-slate-100 text-6xl text-center">
          {journalEntries[0]?.user.author_name}'s Dram Journal
        </h1>
      ) : (
        // If so, simply identify this as "My Dram Journal"
        <h1 className=" m-10 text-slate-100 text-6xl text-center">
          My Dram Journal
        </h1>
      )}
      {/* Render each in this journal, including the following. */}
      {journalEntries.map((entry) => {
        return (
          <div
            key={entry.id}
            className="ml-auto mr-auto w-2/3 p-2 mb-10 border-2 bg-slate-100"
          >
            <section className="border-b-2 flex justify-between">
              {/* Heading with the whiskey's name */}
              <h2 className=" font-bold text-3xl">{entry.whiskey}</h2>
              {/* Does the current user have a bookmark for this entry? */}
              {userBookmarks.find((obj) => obj.entry === entry.id) ? (
                // If the current user has a bookmark for this entry, render a solid bookmark icon.
                // Clicking the icon deletes the bookmark, resets userBookmarks and allEntries, and rerenders the page.
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
                // If the current user does not have a bookmark for this entry, render a hollow bookmark icon.
                // Clicking the icon creates a bookmark, resets userBookmarks and allEntries, and rerenders the page.
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
            {/* the whiskey's type */}
            <p className="border-b-2 pt-2">Type: {entry.whiskey_type?.label}</p>
            {/* If included, the region, state, etc., of the whiskey's country of origin where it is produced, with ... */}
            {entry.part_of_country ? (
              <p className="border-b-2 pt-2">
                {/* the whiskey's country of origin */}
                Origin: {entry.part_of_country}, {entry.country}
              </p>
            ) : (
              <p className="border-b-2 pt-2">Origin: {entry.country}</p>
            )}
            {/* If included, the whiskey's age */}
            {entry.age_in_years > 0 ? (
              <p className="border-b-2 pt-2">
                Age: {parseInt(entry.age_in_years)} years
              </p>
            ) : (
              ""
            )}
            {/* the whiskey's proof */}
            <p className="border-b-2 pt-2">Proof: {entry.proof}</p>
            {/* If included, the whiskey's color, including... */}
            {22 > entry.color.id > 0 ? (
              <div className="border-b-2 pt-2">
                <p>
                  {/* color grade (0.0 - 2.0) with descriptive label and ... */}
                  Color: {entry.color.color_grade} - {entry.color.label}
                  {"  "}
                  {/* whiskey glass icon in the color of the whiskey */}
                  <i
                    className="fa-solid fa-whiskey-glass"
                    style={{ color: `#${entry.color.hex_code}` }}
                  ></i>
                </p>
                <div></div>
              </div>
            ) : (
              ""
            )}
            {/* If included, mash bill information */}
            {entry.mash_bill ? (
              <p className="border-b-2 pt-2">Mash Bill: {entry.mash_bill}</p>
            ) : (
              ""
            )}
            {/* If included, maturation details */}
            {entry.maturation_details ? (
              <p className="border-b-2 pt-2">
                Maturation Details: {entry.maturation_details}
              </p>
            ) : (
              ""
            )}
            {/* description of the whiskey's smell profile */}
            <p className="border-b-2 pt-2">Nose: {entry.nose}</p>
            {/* description of the whiskey's taste profile */}
            <p className="border-b-2 pt-2">Palate: {entry.palate}</p>
            {/* If included, description of how the whiskey finishes */}
            {entry.finish ? <p>Finish: {entry.finish}</p> : ""}
            {/* the whiskey's rating on a five point scale with a descriptive label */}
            <p className="border-b-2 pt-2">
              Rating: {entry.rating.number_rating}/5 - {entry.rating.label}
            </p>
            {/* If included, additional notes */}
            {entry.notes ? (
              <p className="border-b-2 pt-2">Notes: {entry.notes}</p>
            ) : (
              ""
            )}
            {/* date of publication */}
            <p className="pt-2">Date: {entry.publication_date}</p>
            {/* If current user is the entry's owner (i.e., author)... */}
            {entry.is_owner ? (
              // ...render edit and delete icons at opposite corners at the bottom of the entry.
              <div className="flex justify-between my-2">
                {/* Edit icon that, when clicked, navigates to the edit component for this entry */}
                <i
                  onClick={() => {
                    navigate(`/edit/${entry.id}`);
                  }}
                  className="fa-solid fa-pen-ruler"
                ></i>
                {/* Delete icon that, when clicked deletes the entry, resets allEntries, and rerenders page */}
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
