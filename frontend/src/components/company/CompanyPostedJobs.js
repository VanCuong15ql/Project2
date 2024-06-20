import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { useUserData } from "../../context/UserDataProvider"; 

const CompanyPostedJobs = () => {
  const { auth } = useAuth();
  const { userData } = useUserData();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const email = userData?.email;

  useEffect(() => {
    if (userData?.email && auth?.accessToken) {
      setIsLoading(true);
      axios.get(`http://localhost:5000/api/jobs/my-job/${userData.email}`, {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`
        }
      })
        .then((response) => {
          setJobs(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
          setIsLoading(false);
        });
    }
  }, [userData?.email, auth?.accessToken]);

  const handleSearch = () => {
    const filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/jobs/${id}`, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
      .then((response) => {
        if (response.data.message === 'Job deleted') {
          axios.get(`http://localhost:5000/api/jobs/my-job/${userData.email}`, {
            headers: {
              'Authorization': `Bearer ${auth.accessToken}`
            }
          })
            .then((response) => {
              setJobs(response.data);
            })
            .catch((error) =>
              console.error("Error fetching updated jobs:", error)
            );
        }
      })
      .catch((error) => console.error("Error deleting job:", error));
  };

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <div className="max-screen-2xl container mx-auto xl:px-24 px-4 mt-10">
      <div className="my-jobs-container">
        <h1 className="text-center text-2xl font-bold">Jobs List</h1>
        <div>
          <div className="search-box p-2 text-center mb-5">
            <input
              name="search"
              id="search"
              type="text"
              placeholder="Search Jobs..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pl-3 border focus:outline-none mb-4 w-full lg:w-6/12"
            />
            <button
              className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      All jobs
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <Link to="/company-dashboard/post-job">
                      <button
                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Post A New Job
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        ID
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        JOB
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        COMPANY
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        SALARY
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        EDIT
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        DELETE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map((job, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          <Link to={`/company-dashboard/job-applicants/${job._id}`} className="text-blue-500 hover:underline"> {job._id} </Link>
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {job.title}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {job.company.companyName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {job.salary}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button className="bg-red-700 py-2 px-6 text-white rounded-sm">
                            <Link to={`/company-dashboard/edit-job/${job._id}`} className="text-white"> Edit</Link>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className="bg-red-700 py-2 px-6 text-white rounded-sm"
                            onClick={() => {
                              handleDelete(job._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyPostedJobs;