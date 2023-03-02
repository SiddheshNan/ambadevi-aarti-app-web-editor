import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAll, setAll } from "./utils";

export default function Item() {
  let locationData = useLocation();
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    number: "",
    name: "",
    search_txt: "",
  });

  useEffect(() => {
    if (!locationData.state.isNew) {
      const allAarti = getAll(locationData.state.bookType);

      const currentAarti = allAarti[locationData.state.aarti_index];

      setState({
        ...currentAarti,
        search_txt: currentAarti.search_txt.join("\n"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = () => {
    const allAarti = getAll(locationData.state.bookType);

    if (locationData.state.isNew) {
      allAarti.push({
        ...state,
        search_txt: state.search_txt.split("\n"),
      });
    } else {
      allAarti[locationData.state.aarti_index] = {
        ...state,
        search_txt: state.search_txt.split("\n"),
      };
    }
    setAll(locationData.state.bookType, allAarti);
    navigate("/");
  };

  return (
    <div>
      <div>
        <div className="max-w-screen-md mx-auto p-5">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Action :{" "}
              <span className="text-indigo-600">
                {" "}
                {locationData.state.isNew
                  ? `ADD NEW ${locationData.state.bookType}`
                  : `EDIT ${locationData.state.bookType} - ${locationData.state.aarti_index}`}
              </span>
            </h3>
          </div>
          <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 border-gray-400  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Enter number"
                  value={state.number}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, number: e.target.value }))
                  }
                />
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 border-gray-400  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Enter Name"
                  value={state.name}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Search text
                </label>
                <textarea
                  rows={10}
                  className="appearance-none block w-full bg-gray-100 border-gray-400  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  value={state.search_txt}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      search_txt: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-between w-full px-3">
                <button
                  onClick={onSave}
                  className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
