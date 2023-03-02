import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import {
  getAll,
  setAll,
  saveFile,
  AARTI_SANGRAH,
  ASHTAK_PUSTIKA_1,
  ASHTAK_PUSTIKA_2,
  KAKAD_AARTI,
  OTHER_PDF,
} from "./utils";

function App() {
  let locationData = useLocation();
  const [bookType, setBookType] = React.useState(AARTI_SANGRAH);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    setItems(getAll(bookType));
  }, [bookType]);

  useEffect(() => {
    if (locationData.state?.selected) setBookType(locationData.state.selected);
  }, []);

  const delItem = (index, name) => {
    if (window.confirm(`Are you sure to delete - ${name} ?`)) {
      const newState = [...items];
      newState.splice(index, 1);
      setItems(newState);
      setAll(bookType, newState);
    }
  };

  return (
    <div className="App">
      <div className="max-w-screen-md mx-auto p-3.5">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setBookType(AARTI_SANGRAH)}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {AARTI_SANGRAH}
          </button>
          <button
            type="button"
            onClick={() => setBookType(ASHTAK_PUSTIKA_1)}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {ASHTAK_PUSTIKA_1}
          </button>
          <button
            type="button"
            onClick={() => setBookType(ASHTAK_PUSTIKA_2)}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {ASHTAK_PUSTIKA_2}
          </button>
          <button
            type="button"
            onClick={() => setBookType(KAKAD_AARTI)}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {KAKAD_AARTI}
          </button>
          <button
            type="button"
            onClick={() => setBookType(OTHER_PDF)}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {OTHER_PDF}
          </button>
        </div>

        <br />
        <br />

        <h2>Current Selected: {bookType}</h2>
        <br />

        <Link
          to="/item"
          state={{ isNew: true, bookType }}
          className="bg-blue-500 mr-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add New
        </Link>

        <button
          onClick={() => {
            saveFile(`${bookType}-${Date.now()}.json`, JSON.stringify(items));
          }}
          className="bg-blue-500 mr-12  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Download JSON
        </button>
      </div>
      <div className=" rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Number
              </th> */}
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Search
              </th>

              <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {items.map((aarti, aarti_index) => (
              <tr key={aarti_index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <h1 className="font-bold text-gray-700">
                    <span className="font-bold mr-3 text-lg inline-flex items-center  pl-3.5 text-xs font-semibold text-red-500">
                      {aarti.number}.
                    </span>
                    {aarti.name}
                  </h1>
                </td>
                <td className="px-6 py-4">
                  {aarti.search_txt.map((item, search_txt_index) => (
                    <span
                      key={search_txt_index}
                      className="flex mb-1 items-cente text-sm font-semibold text-blue-600"
                    >
                      {item}
                    </span>
                  ))}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <Link
                      to={`/item`}
                      state={{ isNew: false, bookType, aarti_index }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => delItem(aarti_index, aarti.name)}
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
