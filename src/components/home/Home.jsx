import { useEffect, useState } from "react";
import { getAllEntries } from "../../managers/EntryManager";

export const Home = ({ token }) => {
  const [allEntries, setAllEntries] = useState([]);

  const getAndSetAllEntries = async () => {
    const entriesArray = await getAllEntries();
    setAllEntries(entriesArray);
  };

  useEffect(() => {
    getAndSetAllEntries();
  }, [token]);

  return (
    <>
      <h1 className=" text-2xl text-center">Welcome to Dram Journal</h1>
      {allEntries.map((entry) => {
        return (
          <div key={entry.id} className="p-2 m-2 border-2">
            <section className="flex justify-between">
              <h2>{entry.whiskey}</h2>
              <i className="fa-regular fa-bookmark"></i>
            </section>
            <p>Type: {entry.whiskey_type?.label}</p>
            {entry.part_of_country ? (
              <p>
                Origin: {entry.part_of_country}, {entry.country}
              </p>
            ) : (
              <p>Origin: {entry.country}</p>
            )}

            {entry.age_in_years ? (
              <p>Age: {parseInt(entry.age_in_years)} years</p>
            ) : (
              ""
            )}
            <p>Proof: {entry.proof}</p>
            {entry.color ? (
              <div className={`bg-${entry.color.tailwind_name}`}>
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
                <i className="fa-solid fa-pen-ruler"></i>
                <i className="fa-solid fa-trash"></i>
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