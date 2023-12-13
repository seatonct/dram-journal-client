import { useEffect, useState } from "react";
import {
  getAllColors,
  getAllRatings,
  getAllTypes,
} from "../../managers/EntryManager";

export const New = ({ token }) => {
  const [allTypes, setAllTypes] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [newEntry, setNewEntry] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [colorSample, setColorSample] = useState("");

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

  const handleMouseEnter = (hex) => {
    setColorSample(hex);
  };

  const handleMouseLeave = () => {
    setColorSample("");
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const copy = { ...newEntry };
    copy[event.target.id] = event.target.value;
    setNewEntry(copy);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const copy = { ...newEntry };
    copy.rating = selectedOption;
  };

  return (
    <>
      <h1 className="text-4xl text-center">New Entry</h1>;
      <section className="flex justify-center items-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 max-w-screen-md"
          onSubmit={handleSave}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              *Type:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="whiskey_type"
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <div className="flex">
            <div className=" w-1/2">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  *Proof:
                </label>
                <input
                  className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  id="proof"
                  onChange={handleUpdate}
                  required
                ></input>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Color:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="whiskey_type"
                  onChange={handleUpdate}
                >
                  <option defaultValue value="0" key="0">
                    What color is the whiskey?
                  </option>
                  {allColors.map((colorObj) => {
                    return (
                      <>
                        <option
                          key={colorObj.id}
                          value={colorObj.id}
                          onMouseEnter={() => {
                            handleMouseEnter(colorObj.hex_code);
                          }}
                          onMouseLeave={handleMouseLeave}
                        >
                          {colorObj.color_grade}-{colorObj.label}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* Figure out how to set the background color according to the color hovered over or selected. */}
            <div style={{ backgroundColor: `#${colorSample}` }}>
              {/* Color Sample */}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              *Rating:
            </label>
            <div>
              {allRatings.map((rating) => {
                return (
                  <label key={rating.id} className=" px-2">
                    <input
                      type="radio"
                      value={rating.id}
                      onChange={handleOptionChange}
                      checked={parseInt(selectedOption) === rating.id}
                      className=" mr-1"
                    />
                    {rating.number_rating}-{rating.label}
                  </label>
                );
              })}
            </div>
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
