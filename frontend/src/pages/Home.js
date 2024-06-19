import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import SideBar from "../sidebar/SideBar";
import Pagination from "../components/Pagination";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const [queryLocation, setQueryLocation] = useState("");
  const handleLocationInputChange = (e) => {
    setQueryLocation(e.target.value);
  };

  const filteredByTitle = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredByLocation = queryLocation === "Others"
    ? jobs.filter(
        (job) => !["ho chi minh", "ha noi", "da nang"].includes(job.location.toLowerCase())
      )
    : jobs.filter(
        (job) => job.location.toLowerCase().includes(queryLocation.toLowerCase())
      );

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const totalPages = Math.ceil(filteredByTitle.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const filterJobs = () => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredByTitle;
    }
    if (queryLocation) {
      filteredJobs = filteredByLocation;
    }
    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          location,
          salary,
          experience,
          employmentType,
          createdAt,
        }) =>
          location.toLowerCase() === selectedCategory.toLowerCase() ||
          parseInt(salary) <= parseInt(selectedCategory) ||
          createdAt >= selectedCategory ||
          experience.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    const { startIndex, endIndex } = calculatePageRange();
    return filteredJobs.slice(startIndex, endIndex).map((data, i) => (
      <Card key={i} data={data} />
    ));
  };

  const result = filterJobs();

  return (
    <div>
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        queryLocation={queryLocation}
        handleLocationInputChange={handleLocationInputChange}
      />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <SideBar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <p>Loading Jobs...</p>
          ) : result.length > 0 ? (
            <div>
              {result}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <h3 className="font-semibold text-xl ml-5">
              No Jobs Found!
            </h3>
          )}
        </div>

        <div className="bg-white p-4 rounded h-full">
          <div className="h-full w-full bg-gradient-to-b from-[#191714] to-[#2234AE] text-white p-4 text-center md:text-left">
            <div className="flex flex-col ml-2 h-full gap-6">
              <h1 className="text-5xl font-bold mb-5 mt-[150px]">
                Bot<span className="text-blue">CV</span>
              </h1>
              <div className="flex flex-col gap-1">
                <h2 className="text-4xl font-bold mb-2">One Love</h2>
                <h2 className="text-4xl font-bold mb-2">One Future</h2>
                <p>BotCV - #1 Recruitment Website in Vietnam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;