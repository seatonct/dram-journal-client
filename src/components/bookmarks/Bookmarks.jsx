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
      {bookmarkedEntries.map((bookmark) => {
        return (
          <div
            key={bookmark.entry.id}
            className="ml-auto mr-auto w-2/3 p-2 mb-10 border-2 bg-slate-100"
          >
            <section className="border-b-2 flex justify-between">
              <h2 className=" font-bold text-3xl">{bookmark.entry.whiskey}</h2>
              <i
                onClick={async () => {
                  await deleteBookmark(bookmark);

                  await getAndSetBookmarkedEntries();
                }}
                className="fa-solid fa-bookmark"
              ></i>
            </section>
            <p className="border-b-2 pt-2">
              Type: {bookmark.entry.whiskey_type?.label}
            </p>
            {bookmark.entry.part_of_country ? (
              <p className="border-b-2 pt-2">
                Origin: {bookmark.entry.part_of_country},{" "}
                {bookmark.entry.country}
              </p>
            ) : (
              <p className="border-b-2 pt-2">
                Origin: {bookmark.entry.country}
              </p>
            )}

            {bookmark.entry.age_in_years > 0 ? (
              <p className="border-b-2 pt-2">
                Age: {parseInt(bookmark.entry.age_in_years)} years
              </p>
            ) : (
              ""
            )}
            <p className="border-b-2 pt-2">Proof: {bookmark.entry.proof}</p>
            {22 > bookmark.entry.color.id > 0 ? (
              <div className="border-b-2 pt-2">
                <p className="border-b-2 pt-2">
                  Color: {bookmark.entry.color.color_grade} -{" "}
                  {bookmark.entry.color.label}
                  {"  "}
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
            {bookmark.entry.mash_bill ? (
              <p className="border-b-2 pt-2">
                Mash Bill: {bookmark.entry.mash_bill}
              </p>
            ) : (
              ""
            )}
            {bookmark.entry.maturation_details ? (
              <p className="border-b-2 pt-2">
                Maturation Details: {bookmark.entry.maturation_details}
              </p>
            ) : (
              ""
            )}
            <p className="border-b-2 pt-2">Nose: {bookmark.entry.nose}</p>
            <p className="border-b-2 pt-2">Palate: {bookmark.entry.palate}</p>
            {bookmark.entry.finish ? (
              <p className="border-b-2 pt-2">Finish: {bookmark.entry.finish}</p>
            ) : (
              ""
            )}
            <p className="border-b-2 pt-2">
              Rating: {bookmark.entry.rating.number_rating}/5 -{" "}
              {bookmark.entry.rating.label}
            </p>
            {bookmark.entry.notes ? (
              <p className="border-b-2 pt-2">Notes: {bookmark.entry.notes}</p>
            ) : (
              ""
            )}
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
