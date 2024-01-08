import { useEffect, useState } from "react";
import {
  createEntry,
  getAllColors,
  getAllRatings,
  getAllTypes,
} from "../../managers/EntryManager";
import { useNavigate } from "react-router-dom";

export const New = ({ currentUsername }) => {
  const [allTypes, setAllTypes] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [chosenColor, setChosenColor] = useState({});
  const [newEntry, setNewEntry] = useState({
    whiskey: "",
    type_id: 0,
    country: "",
    part_of_country: "",
    age_in_years: 0,
    proof: "",
    color_id: 22,
    mash_bill: "",
    maturation_details: "",
    nose: "",
    palate: "",
    finish: "",
    rating_id: 0,
    notes: "",
  });
  // const [colorSample, setColorSample] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    const thisColor = allColors.find((color) => {
      color.id === newEntry.color_id;
    });
    setChosenColor(thisColor);
  }, [allColors, newEntry]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const copy = { ...newEntry };
    copy[event.target.id] = event.target.value;
    setNewEntry(copy);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const copy = { ...newEntry };
    await createEntry(copy);
    navigate(`/${currentUsername}`);
  };

  return (
    <>
      <h1 className=" mt-10 text-slate-100 text-6xl text-center">New Entry</h1>;
      <section className="flex justify-center items-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 max-w-screen-lg"
          onSubmit={handleSave}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Whiskey:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="whiskey"
              placeholder="Enter the name of the whiskey"
              onChange={handleUpdate}
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Type:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="type_id"
              onChange={handleUpdate}
              required
            >
              <option defaultValue value="0" key="0">
                Select a whiskey type...
              </option>
              {allTypes.map((typeObj) => {
                return (
                  <option key={typeObj.id} value={typeObj.id}>
                    {typeObj.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Country of Origin:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="country"
              placeholder="Enter the name of country where the whiskey was produced"
              onChange={handleUpdate}
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              State/Province/Region:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="part_of_country"
              placeholder="Enter the state, region, or province where the whiskey was produced"
              onChange={handleUpdate}
            ></input>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Age:
            </label>
            <input
              className="shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="age_in_years"
              onChange={handleUpdate}
            ></input>
            <span> years</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Proof:
            </label>
            <input
              className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="float"
              id="proof"
              onChange={handleUpdate}
              required
            ></input>
          </div>

          <div className="mb-4">
            <img
              className="mb-2"
              src="https://images.squarespace-cdn.com/content/v1/5ea1d97fa7adf23f0a1c9f63/1592961180376-PJ77I2KEQG9INTCPASXS/whiskey+color+whisky+mag.jpg?format=1000w"
              alt="Whiskey color scale"
            ></img>
            <label className="block text-gray-700 text-md font-bold mb-2">
              Color:{" "}
              <i
                style={{ color: `#${chosenColor?.hex_code}` }}
                className="fa-solid fa-whiskey-glass text-4xl"
              ></i>
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="color_id"
              onChange={handleUpdate}
            >
              <option defaultValue value="0" key="0">
                What color is the whiskey?
              </option>
              {allColors.map((colorObj) => {
                if (colorObj.id > 0 && colorObj.id < 22) {
                  return (
                    <option
                      key={colorObj.id}
                      value={colorObj.id}
                      // onMouseEnter={() => {
                      //   handleMouseEnter(colorObj.hex_code);
                      // }}
                      // onMouseLeave={handleMouseLeave}
                    >
                      {colorObj.color_grade}-{colorObj.label}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Mash Bill:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="mash_bill"
              placeholder="Enter information about the whiskey's mash bill"
              onChange={handleUpdate}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Maturation Details:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="maturation_details"
              placeholder="Enter information regarding how the whiskey was matured"
              onChange={handleUpdate}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Nose:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="nose"
              placeholder="What does the whiskey smell like?"
              onChange={handleUpdate}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Palate:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="palate"
              placeholder="What does the whiskey taste like?"
              onChange={handleUpdate}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Finish:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="finish"
              placeholder="Describe the finish"
              onChange={handleUpdate}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              *Rating:
            </label>
            <div>
              {allRatings.map((rating) => {
                return (
                  <label key={rating.id} className=" px-2">
                    <input
                      id="rating_id"
                      type="radio"
                      value={rating.id}
                      onChange={handleUpdate}
                      checked={parseInt(newEntry.rating_id) === rating.id}
                      className=" mr-1"
                    />
                    {rating.number_rating}-{rating.label}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Notes:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="notes"
              placeholder="Add additional notes here"
              onChange={handleUpdate}
            ></textarea>
          </div>

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
