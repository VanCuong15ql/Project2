import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const JobApplicants = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jobs/${id}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setApplicants(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [id, auth.accessToken]);

  const handleApprove = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/jobs/${id}/applicants/${userId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      alert(response.data.message);

      setApplicants(
        applicants.map((applicant) =>
          applicant._id === userId
            ? { ...applicant, status: "Approved" }
            : applicant
        )
      );
    } catch (error) {
      console.error("Error approving applicant:", error);
      alert("Error approving applicant");
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/jobs/${id}/applicants/${userId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      alert(response.data.message);

      setApplicants(
        applicants.map((applicant) =>
          applicant._id === userId
            ? { ...applicant, status: "Rejected" }
            : applicant
        )
      );
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      alert("Error rejecting applicant");
    }
  };

  if (isLoading) {
    return <div>Loading applicants...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-10">
      <div className="my-jobs-container">
        <h1 className="text-center text-2xl font-bold">Job Applicants</h1>

        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Full Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Email
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        CV
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Status
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {applicants.map((applicant, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {applicant.fullName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {applicant.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <a
                            href={`http://localhost:5000/${applicant.cvFile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download CV
                          </a>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {applicant.status || "Pending"}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded m-1"
                            onClick={() => handleApprove(applicant._id)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded m-1"
                            onClick={() => handleReject(applicant._id)}
                          >
                            Reject
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

export default JobApplicants;
