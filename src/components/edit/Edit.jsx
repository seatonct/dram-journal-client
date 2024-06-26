import { useEffect, useState } from "react";
import {
  UpdateEntry,
  getAllColors,
  getAllRatings,
  getAllTypes,
  getEntryById,
} from "../../managers/EntryManager";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = ({ currentUsername }) => {
  const [allTypes, setAllTypes] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [entry, setEntry] = useState();
  const [chosenColor, setChosenColor] = useState();

  const { postId } = useParams();
  const navigate = useNavigate();

  // Get type, color, and rating options for display in dropdowns & radio buttons
  useEffect(() => {
    getAllTypes().then((types) => {
      setAllTypes(types);
      getAllColors().then((colors) => {
        setAllColors(colors);
        getAllRatings().then((ratings) => {
          setAllRatings(ratings);
        });
      });
    });
  }, []);

  // Set state for this entry using the id from the url.
  useEffect(() => {
    getEntryById(postId).then((entryObj) => {
      setEntry(entryObj);
    });
  }, [postId]);

  // Set chosenColor based on the color id currently chosen for the entry.
  useEffect(() => {
    const thisColor = allColors.find(
      (color) => color.id === parseInt(entry?.color.id)
    );
    setChosenColor(thisColor);
  }, [allColors, entry?.color.id]);

  // Whenever the user makes a change, update the entry's state accordingly.
  const handleUpdate = (event) => {
    event.preventDefault();
    const copy = { ...entry };
    copy[event.target.id] = event.target.value;
    setEntry(copy);
  };

  // When the user clicks the Save button, save the updated entry to the database
  // and then navigate to the current user's journal.
  const handleSave = async (event) => {
    event.preventDefault();

    const updatedEntry = {
      id: entry.id,
      whiskey: entry.whiskey,
      whiskey_type: entry.whiskey_type.id,
      country: entry.country,
      part_of_country: entry.part_of_country,
      age_in_years: entry.age_in_years,
      proof: entry.proof,
      color_id: entry.color.id,
      mash_bill: entry.mash_bill,
      maturation_details: entry.maturation_details,
      nose: entry.nose,
      palate: entry.palate,
      finish: entry.finish,
      rating: entry.rating.id,
      notes: entry.notes,
    };

    await UpdateEntry(updatedEntry);
    navigate(`/${currentUsername}`);
  };

  return (
    <>
      <h1 className=" mt-10 text-slate-100 text-6xl text-center">Edit Entry</h1>
      ;
      <section className="flex justify-center items-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 max-w-screen-lg"
          onSubmit={handleSave}
        >
          {/* The user may change the whiskey's name, but must include a name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Whiskey:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.whiskey ? entry.whiskey : ""}
              type="text"
              id="whiskey"
              placeholder="Enter the name of the whiskey"
              onChange={handleUpdate}
              required
            ></input>
          </div>
          {/* They user may change the whiskey's type, but must include a type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Type:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.whiskey_type.id ? entry.whiskey_type.id : 0}
              type="text"
              id="whiskey_id"
              onChange={(event) => {
                const copy = { ...entry };
                copy.whiskey_type.id = event.target.value;
                setEntry(copy);
              }}
              required
            >
              <option defaultValue value="0" key="0">
                Select a whiskey type...
              </option>
              {/* Display type options in dropdown menu */}
              {allTypes.map((typeObj) => {
                return (
                  <option key={typeObj.id} value={typeObj.id}>
                    {typeObj.label}
                  </option>
                );
              })}
            </select>
          </div>
          {/* The user may change the whiskey's country of origin but must include a country of origin */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Country of Origin:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.country ? entry.country : ""}
              type="text"
              id="country"
              placeholder="Enter the name of country where the whiskey was produced"
              onChange={handleUpdate}
              required
            ></input>
          </div>
          {/* The user may change or remove the whiskey's state, province, or region */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              State/Province/Region:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.part_of_country ? entry.part_of_country : ""}
              type="text"
              id="part_of_country"
              placeholder="Enter the state, region, or province where the whiskey was produced"
              onChange={handleUpdate}
            ></input>
          </div>
          {/* The user may change or remove the whiskey's age */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Age:
            </label>
            <input
              className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.age_in_years ? entry.age_in_years : 0}
              type="number"
              id="age_in_years"
              onChange={handleUpdate}
            ></input>
            <span> years</span>
          </div>
          {/* The user may change the whiskey's proof, but must include a proof for the whiskey */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Proof:
            </label>
            <input
              className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.proof ? entry.proof : 0}
              type="float"
              id="proof"
              onChange={handleUpdate}
              required
            ></input>
          </div>
          {/* The user may change or remove the color selection for the whiskey */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Color:{" "}
              {/* whiskey glass icon in the current chosenColor for the whiskey */}
              <i
                style={{ color: `#${chosenColor?.hex_code}` }}
                className="fa-solid fa-whiskey-glass text-4xl"
              ></i>
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.color.id ? entry.color.id : 0}
              type="text"
              id="color_id"
              onChange={(event) => {
                const copy = { ...entry };
                copy.color.id = event.target.value;
                setEntry(copy);
              }}
            >
              <option defaultValue value="0" key="0">
                What color is the whiskey?
              </option>
              {/* Display the number rating (0.0-2.0) and descriptive label
              for each color option in the dropdown menu */}
              {allColors.map((colorObj) => {
                if (colorObj.id > 0 && colorObj.id < 22) {
                  return (
                    <option key={colorObj.id} value={colorObj.id}>
                      {colorObj.color_grade}-{colorObj.label}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          {/* The user may change or remove mash bill info for the whiskey */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Mash Bill:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.mash_bill ? entry.mash_bill : ""}
              type="text"
              id="mash_bill"
              placeholder="Enter information about the whiskey's mash bill"
              onChange={handleUpdate}
            ></textarea>
          </div>
          {/* The user may change or remove maturation details */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Maturation Details:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.maturation_details ? entry.maturation_details : ""}
              type="text"
              id="maturation_details"
              placeholder="Enter information regarding how the whiskey was matured"
              onChange={handleUpdate}
            ></textarea>
          </div>
          {/* The user may change the description of the whiskey's smell profile
          but must include some description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Nose:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.nose ? entry.nose : ""}
              type="text"
              id="nose"
              placeholder="What does the whiskey smell like?"
              onChange={handleUpdate}
              required
            ></textarea>
          </div>
          {/* The user may change the description of the whiskey's taste profile
          but must include some description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Palate:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.palate ? entry.palate : ""}
              type="text"
              id="palate"
              placeholder="What does the whiskey taste like?"
              onChange={handleUpdate}
              required
            ></textarea>
          </div>
          {/* The user may change or remove */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Finish:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.finish ? entry.finish : ""}
              type="text"
              id="finish"
              placeholder="Describe the finish"
              onChange={handleUpdate}
            ></textarea>
          </div>
          {/* The user may change the whiskey's rating but must include a rating */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Rating:
            </label>
            <div>
              {/* Display a radio button for each rating option */}
              {allRatings.map((rating) => {
                return (
                  <label key={rating.id} className=" px-2">
                    <input
                      id="rating"
                      type="radio"
                      value={rating.id}
                      onChange={(event) => {
                        const copy = { ...entry };
                        copy.rating.id = event.target.value;
                        setEntry(copy);
                      }}
                      checked={parseInt(entry.rating.id) === rating.id}
                      className=" mr-1"
                    />
                    {/* Each rating option includes a number on a five point scale
                    and a descriptive label */}
                    {rating.number_rating}-{rating.label}
                  </label>
                );
              })}
            </div>
          </div>
          {/* The user may change or remove additional notes */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Notes:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={entry?.notes ? entry.notes : ""}
              type="text"
              id="notes"
              placeholder="Add additional notes here"
              onChange={handleUpdate}
            ></textarea>
          </div>
          {/* Let the user know that fields marked with an asterisk are required fields. */}
          <div>* Required Field</div>
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 ml-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Entry
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
