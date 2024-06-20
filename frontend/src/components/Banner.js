import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ query, handleInputChange, queryLocation, handleLocationInputChange }) => {
  return (
    <div className="max-screen-w-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Find Your <span className="text-blue">Dream Job</span> Today!
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Welcome to <span className="text-blue font-medium">BotCV</span>, where
        endless opportunities await.
      </p>
      <form>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <div
            className="flex md:rounded-sm-d rounded shadow-sm ring-1 ring-inset ring-gray-300 
                focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full"
          >
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Try to search for some jobs "
              className="block flex-1 border-0 bg-transparent
                    py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6
                    focus:outline-none focus:ring-0 focus:border-indigo-600 transition-all duration-300"
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <div
            className="flex md:rounded-sm-none rounded shadow-sm ring-1 ring-inset ring-gray-300 
                focus-within:ring-2 focus-within:ring-inset  md:w-1/3 w-full"
          >
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Search by location"
              className="block flex-1 border-0 bg-transparent
                    py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6
                    focus:outline-none focus:ring-0 focus:border-indigo-600 transition-all duration-300"
              onChange={handleLocationInputChange}
              value={queryLocation}
            />
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="bg-blue py-2 px-8 text-white md:rounded-s-none rounded"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;