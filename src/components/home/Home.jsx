import { useEffect, useState } from "react";
import { getAllEntries, deleteEntry } from "../../managers/EntryManager";
import { useNavigate, Link } from "react-router-dom";
import {
  createBookmark,
  getBookmarksByUsername,
  deleteBookmark,
} from "../../managers/BookmarkManager";

export const Home = ({ token, currentUsername }) => {
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
  }, [token, currentUsername]);

  return (
    <>
      <h1 className=" m-10 text-slate-100 text-4xl text-center">
        Welcome to Dram Journal
      </h1>
      {allEntries.map((entry) => {
        return (
          <div
            key={entry.id}
            className=" ml-auto mr-auto w-2/3 p-2 mb-10 border-2 bg-slate-100"
          >
            <section className="border-b-2 flex justify-between">
              <h2 className=" text-3xl">{entry.whiskey}</h2>
              {userBookmarks.find((obj) => obj.entry === entry.id) ? (
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
            <p className="border-b-2 pt-2">Type: {entry.whiskey_type?.label}</p>
            {entry.part_of_country ? (
              <p className="border-b-2 pt-2">
                Origin: {entry.part_of_country}, {entry.country}
              </p>
            ) : (
              <p className="border-b-2 pt-2">Origin: {entry.country}</p>
            )}

            {entry.age_in_years > 0 ? (
              <p className="border-b-2 pt-2">
                Age: {parseInt(entry.age_in_years)} years
              </p>
            ) : (
              ""
            )}
            <p className="border-b-2 pt-2">Proof: {entry.proof}</p>
            {22 > entry.color.id > 0 ? (
              <div
                className="border-b-2 pt-2"
                style={{ backgroundColor: `#${entry.color.hex_code}` }}
              >
                <p>
                  Color: {entry.color.color_grade} - {entry.color.label}
                </p>
                <div></div>
              </div>
            ) : (
              ""
            )}
            {entry.mash_bill ? (
              <p className="border-b-2 pt-2">Mash Bill: {entry.mash_bill}</p>
            ) : (
              ""
            )}
            {entry.maturation_details ? (
              <p className="border-b-2 pt-2">
                Maturation Details: {entry.maturation_details}
              </p>
            ) : (
              ""
            )}
            <p className="border-b-2 pt-2">Nose: {entry.nose}</p>
            <p className="border-b-2 pt-2">Palate: {entry.palate}</p>
            {entry.finish ? (
              <p className="border-b-2 pt-2">Finish: {entry.finish}</p>
            ) : (
              ""
            )}
            <p className="border-b-2 pt-2">
              Rating: {entry.rating.number_rating}/5 - {entry.rating.label}
            </p>
            {entry.notes ? (
              <p className="border-b-2 pt-2">Notes: {entry.notes}</p>
            ) : (
              ""
            )}
            <p className="pt-2">
              From{" "}
              <Link className=" text-blue-700" to={`/${entry.user.username}`}>
                {entry.user.author_name}'s
              </Link>{" "}
              Dram Journal {entry.publication_date}
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
