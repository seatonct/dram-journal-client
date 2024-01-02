import { useEffect, useState } from "react";
import { deleteEntry, getBookmarkedEntries } from "../../managers/EntryManager";
import { useNavigate } from "react-router-dom";
import {
  getBookmarksWithExpandedEntry,
  deleteBookmark,
} from "../../managers/BookmarkManager";

export const Bookmarks = ({ currentUsername }) => {
  const [bookmarkedEntries, setBookmarkedEntries] = useState([]);

  const navigate = useNavigate();

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
      <h1 className=" text-2xl text-center">Bookmarked Journal Entries</h1>
      {bookmarkedEntries.map((bookmark) => {
        return (
          <div key={bookmark.entry.id} className="p-2 m-2 border-2">
            <section className="flex justify-between">
              <h2>{bookmark.entry.whiskey}</h2>
              <i
                onClick={async () => {
                  await deleteBookmark(
                    bookmarkedEntries.find(
                      (bookmark) => bookmark.entry.id === bookmark.entry.id
                    )
                  );

                  await getAndSetBookmarkedEntries(currentUsername);
                }}
                className="fa-solid fa-bookmark"
              ></i>
            </section>
            <p>Type: {bookmark.entry.whiskey_type?.label}</p>
            {bookmark.entry.part_of_country ? (
              <p>
                Origin: {bookmark.entry.part_of_country},{" "}
                {bookmark.entry.country}
              </p>
            ) : (
              <p>Origin: {bookmark.entry.country}</p>
            )}

            {bookmark.entry.age_in_years > 0 ? (
              <p>Age: {parseInt(bookmark.entry.age_in_years)} years</p>
            ) : (
              ""
            )}
            <p>Proof: {bookmark.entry.proof}</p>
            {22 > bookmark.entry.color.id > 0 ? (
              <div
                style={{ backgroundColor: `#${bookmark.entry.color.hex_code}` }}
              >
                <p>
                  Color: {bookmark.entry.color.color_grade} -{" "}
                  {bookmark.entry.color.label}
                </p>
                <div></div>
              </div>
            ) : (
              ""
            )}
            {bookmark.entry.mash_bill ? (
              <p>Mash Bill: {bookmark.entry.mash_bill}</p>
            ) : (
              ""
            )}
            {bookmark.entry.maturation_details ? (
              <p>Maturation Details: {bookmark.entry.maturation_details}</p>
            ) : (
              ""
            )}
            <p>Nose: {bookmark.entry.nose}</p>
            <p>Palate: {bookmark.entry.palate}</p>
            {bookmark.entry.finish ? (
              <p>Finish: {bookmark.entry.finish}</p>
            ) : (
              ""
            )}
            <p>
              Rating: {bookmark.entry.rating.number_rating}/5 -{" "}
              {bookmark.entry.rating.label}
            </p>
            {bookmark.entry.notes ? <p>Notes: {bookmark.entry.notes}</p> : ""}
            <p>
              From {bookmark.entry.user.author_name}'s Dram Journal{" "}
              {bookmark.entry.publication_date}
            </p>
            {bookmark.entry.is_owner ? (
              <div className="flex justify-between my-2">
                <i
                  onClick={() => {
                    navigate(`/edit/${bookmark.entry.id}`);
                  }}
                  className="fa-solid fa-pen-ruler"
                ></i>
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
