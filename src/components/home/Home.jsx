import { useEffect, useState } from "react";
import { getAllEntries, deleteEntry } from "../../managers/EntryManager";
import { useNavigate, Link } from "react-router-dom";
import {
  createBookmark,
  getBookmarksByUsername,
  deleteBookmark,
} from "../../managers/BookmarkManager";

export const Home = ({ currentUsername }) => {
  const [allEntries, setAllEntries] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);

  const navigate = useNavigate();

  const getAndSetAllEntries = async () => {
    const entriesArray = await getAllEntries();
    setAllEntries(entriesArray);
  };

  const getAndSetUserBookmarks = async () => {
    if (currentUsername) {
      const bookmarksArray = await getBookmarksByUsername(currentUsername);
      setUserBookmarks(bookmarksArray);
    }
  };

  const handleDelete = async (entryId) => {
    await deleteEntry(entryId);
    await getAndSetAllEntries();
  };

  useEffect(() => {
    if (currentUsername) {
      getAndSetUserBookmarks().then(() => {
        getAndSetAllEntries();
      });
    }
  }, [currentUsername]);

  return (
    <>
      <h1 className=" m-10 text-slate-100 text-6xl text-center">
        Welcome to Dram Journal
      </h1>
      {allEntries.map((entry) => {
        return (
          <div
            key={entry.id}
            className=" ml-auto mr-auto w-2/3 p-2 mb-10 border-2 bg-slate-100"
          >
            <section className="border-b-2 flex justify-between">
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
                    await getAndSetAllEntries();
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
                    await getAndSetAllEntries();
                  }}
                  className="fa-regular fa-bookmark"
                ></i>
              )}
            </section>
            {/* Whiskey Type */}
            <p className="border-b-2 pt-2">Type: {entry.whiskey_type?.label}</p>
            {/* If included, state, region, etc., where whiskey is produced in country of origin */}
            {entry.part_of_country ? (
              <p className="border-b-2 pt-2">
                {/* Country of Origin */}
                Origin: {entry.part_of_country}, {entry.country}
              </p>
            ) : (
              <p className="border-b-2 pt-2">Origin: {entry.country}</p>
            )}
            {/* If included, age of whiskey */}
            {entry.age_in_years > 0 ? (
              <p className="border-b-2 pt-2">
                Age: {parseInt(entry.age_in_years)} years
              </p>
            ) : (
              ""
            )}
            {/* Proof of Whiskey */}
            <p className="border-b-2 pt-2">Proof: {entry.proof}</p>
            {/* If included, color of whiskey*/}
            {22 > entry.color.id > 0 ? (
              <div className="border-b-2 pt-2">
                <p>
                  {/* Color grade (0.0 - 2.0) and descriptive label */}
                  Color: {entry.color.color_grade} - {entry.color.label}
                  {"  "}
                  {/* Whiskey glass icon in the color of the whiskey */}
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
            {/* Description of the whiskey's smell profile */}
            <p className="border-b-2 pt-2">Nose: {entry.nose}</p>
            {/* Description of the whiskey's taste profile */}
            <p className="border-b-2 pt-2">Palate: {entry.palate}</p>
            {/* If included, description of how the whiskey finishes */}
            {entry.finish ? (
              <p className="border-b-2 pt-2">Finish: {entry.finish}</p>
            ) : (
              ""
            )}
            {/* Rating of the whiskey on 5 point scale */}
            <p className="border-b-2 pt-2">
              {/* Rating number and description */}
              Rating: {entry.rating.number_rating}/5 - {entry.rating.label}
            </p>
            {/* If included, additional notes */}
            {entry.notes ? (
              <p className="border-b-2 pt-2">Notes: {entry.notes}</p>
            ) : (
              ""
            )}
            {/* Entry author's name wrapped in link to author's journal and date of publication */}
            <p className="pt-2">
              From{" "}
              <Link className=" text-blue-700" to={`/${entry.user.username}`}>
                {entry.user.author_name}'s
              </Link>{" "}
              Dram Journal {entry.publication_date}
            </p>
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
