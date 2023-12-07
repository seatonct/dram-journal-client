import { useEffect, useState } from "react";
import { getAllEntries } from "../../managers/EntryManager";

export const Home = ({ token }) => {
  const [allEntries, setAllEntries] = useState([]);

  const getAndSetAllEntries = async (token = { token }) => {
    const entriesArray = await getAllEntries();
    setAllEntries(entriesArray);
  };

  useEffect(() => {
    getAndSetAllEntries();
  }, []);

  return (
    <>
      <h1 className=" text-2xl text-center">Welcome to Dram Journal</h1>
      {allEntries.map((entry) => {
        return (
          <>
            <div key={entry.id}>
              <h2>{entry.whiskey}</h2>
            </div>
          </>
        );
      })}
    </>
  );
};
