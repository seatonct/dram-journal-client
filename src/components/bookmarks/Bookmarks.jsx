import { useEffect, useState } from "react";
import { deleteEntry } from "../../managers/EntryManager";
import { useNavigate, Link } from "react-router-dom";
import {
  getBookmarksWithExpandedEntry,
  deleteBookmark,
} from "../../managers/BookmarkManager";

export const Bookmarks = ({ currentUsername }) => {
  const [bookmarkedEntries, setBookmarkedEntries] = useState([]);

  const navigate = useNavigate();

  // Get the current user's bookmarks, including entry data.
  const getAndSetBookmarkedEntries = async () => {
    const entryArray = await getBookmarksWithExpandedEntry(currentUsername);
    setBookmarkedEntries(entryArray);
  };

  const handleDelete = async (entryId) => {
    await deleteEntry(entryId);
    await getAndSetBookmarkedEntries();
  };

  useEffect(() => {
    if (currentUsername) {
      getAndSetBookmarkedEntries();
    }
  }, [currentUsername]);

  return (
    <>
      <h1 className=" m-10 text-slate-100 text-6xl text-center">
        Bookmarked Entries
      </h1>
      {/* Display entries the current user has bookmarked. */}
      {bookmarkedEntries.map((bookmark) => {
        return (
          <div
            key={bookmark.entry.id}
            className="ml-auto mr-auto w-2/3 p-2 mb-10 border-2 bg-slate-100"
          >
            <section className="border-b-2 flex justify-between">
              {/* The bookmark's name */}
              <h2 className=" font-bold text-3xl">{bookmark.entry.whiskey}</h2>
              {/* Render a solid bookmark icon that, when clicked, deletes the user's bookmark 
              for this entry, resets bookmarked Entries, and then reloads the page. */}
              <i
                onClick={async () => {
                  await deleteBookmark(bookmark);

                  await getAndSetBookmarkedEntries();
                }}
                className="fa-solid fa-bookmark"
              ></i>
            </section>
            {/* the Whiskey's type */}
            <p className="border-b-2 pt-2">
              Type: {bookmark.entry.whiskey_type?.label}
            </p>
            {/* If included, the state, region, etc., in the whiskey's country
            of origin where it is produced and ... */}
            {bookmark.entry.part_of_country ? (
              // the whiskey's country of origin
              <p className="border-b-2 pt-2">
                Origin: {bookmark.entry.part_of_country},{" "}
                {bookmark.entry.country}
              </p>
            ) : (
              <p className="border-b-2 pt-2">
                Origin: {bookmark.entry.country}
              </p>
            )}
            {/* If included, the whiskey's age */}
            {bookmark.entry.age_in_years > 0 ? (
              <p className="border-b-2 pt-2">
                Age: {parseInt(bookmark.entry.age_in_years)} years
              </p>
            ) : (
              ""
            )}
            {/* the whiskey's proof */}
            <p className="border-b-2 pt-2">Proof: {bookmark.entry.proof}</p>
            {/* If included, the whiskey's color, including... */}
            {22 > bookmark.entry.color.id > 0 ? (
              <div className="border-b-2 pt-2">
                {/* the color rating (0.0-2.0) with a descriptive label and ... */}
                <p className="border-b-2 pt-2">
                  Color: {bookmark.entry.color.color_grade} -{" "}
                  {bookmark.entry.color.label}
                  {"  "}
                  {/* whiskey glass icon in the color of the whiskey */}
                  <i
                    className="fa-solid fa-whiskey-glass"
                    style={{ color: `#${bookmark.entry.color.hex_code}` }}
                  ></i>
                </p>
                <div></div>
              </div>
            ) : (
              ""
            )}
            {/* If included, mash bill information */}
            {bookmark.entry.mash_bill ? (
              <p className="border-b-2 pt-2">
                Mash Bill: {bookmark.entry.mash_bill}
              </p>
            ) : (
              ""
            )}
            {/* If included, maturation details */}
            {bookmark.entry.maturation_details ? (
              <p className="border-b-2 pt-2">
                Maturation Details: {bookmark.entry.maturation_details}
              </p>
            ) : (
              ""
            )}
            {/* Description of the whiskey's smell profile */}
            <p className="border-b-2 pt-2">Nose: {bookmark.entry.nose}</p>
            {/* Description of the whiskey's taste profile */}
            <p className="border-b-2 pt-2">Palate: {bookmark.entry.palate}</p>
            {/* If included, description of how the whiskey finishes */}
            {bookmark.entry.finish ? (
              <p className="border-b-2 pt-2">Finish: {bookmark.entry.finish}</p>
            ) : (
              ""
            )}
            {/* the whiskey's rating on a five point scale with a descriptive label */}
            <p className="border-b-2 pt-2">
              Rating: {bookmark.entry.rating.number_rating}/5 -{" "}
              {bookmark.entry.rating.label}
            </p>
            {/* If included, additional notes */}
            {bookmark.entry.notes ? (
              <p className="border-b-2 pt-2">Notes: {bookmark.entry.notes}</p>
            ) : (
              ""
            )}
            {/* Entry author's name wrapped in a link to the author's journal, along with publication date */}
            <p className="pt-2">
              From{" "}
              <Link
                className=" text-blue-700"
                to={`/${bookmark.entry.user.username}`}
              >
                {bookmark.entry.user.author_name}'s
              </Link>{" "}
              Dram Journal {bookmark.entry.publication_date}
            </p>
            {/* If the current users is the author of the bookmarked entry, include... */}
            {bookmark.entry.is_owner ? (
              <div className="flex justify-between my-2">
                {/* edit icon that, when clicked, navigates to the edit page for this entry and... */}
                <i
                  onClick={() => {
                    navigate(`/edit/${bookmark.entry.id}`);
                  }}
                  className="fa-solid fa-pen-ruler"
                ></i>
                {/* delete icon that, when clicked, deletes the entry, resets bookmarkedEntries,
                and then reloads the page */}
                <i
                  onClick={() => {
                    handleDelete(bookmark.entry.id);
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
