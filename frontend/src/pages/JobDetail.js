import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaCoins, FaHourglass, FaMapMarkerAlt, FaMoneyBillWave, FaMoneyBillWaveAlt } from "react-icons/fa";

const JobDetail = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null); // Ref to the hidden file input

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        const result = await response.json();
        setJob(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, auth.accessToken]);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
    handleApply(e.target.files[0]); // Apply immediately after the file is selected
  };

  const handleApplyClick = () => {
    if (!auth?.accessToken) {
      alert("Please log in to apply.");
      navigate("/login");
      return;
    }

    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  const handleApply = async (file) => {
    if (!file) {
      alert("Please upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/${id}/apply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Applied successfully!");
      } else {
        alert(result.message || "Failed to apply for job");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Error applying for job");
    }
  };

  if (isLoading) {
    return <div>Loading job details...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-slate-100 py-10 px-4 lg:px-16">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex mb-4">
            <div className="w-3/5 bg-white shadow-lg rounded p-4 mb-4 flex items-center border ">
              <div className="flex items-center  w-full">
                <div className="flex-1 ">
                  <h3 className="text-lg font-semibold mb-1">{job.title}</h3>

                  <div className="flex flex-wrap gap-20 mt-2 justify-between">
                    <span className="badge">
                      <FaMapMarkerAlt className="text-blue w-5 h-5" /> {job.location}
                    </span>
                    <span className="badge">
                      <FaMoneyBillWaveAlt className="text-blue w-5 h-5 " />
                      {job.salary}
                    </span>
                    <span className="badge">
                      <FaHourglass className="text-blue w-5 h-5" />
                      {job.experience}
                    </span>
                  </div>
                  <p className="text-red-600 font-semibold">
                    Hạn nộp hồ sơ: {job.applicationDeadline?.split("T")[0]}
                  </p>
                  <button
                    onClick={handleApplyClick}
                    className="bg-blue text-white px-6 py-3 rounded-md w-full"
                  >
                    Apply now!
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className=" p-4 border shadow-lg w-2/5 ml-2">
              <img
                src={job.company?.companyLogo}
                alt={`${job.company?.companyName} logo`}
                className="w-20 h-20 mb-4 border"
              />

              <p className="mb-2 text-xl font-bold">
                {job.company?.companyName}
              </p>
              <p className="mb-2 text-sm ">Email:
                {job.company?.email}
              </p>
              <a
                href={job.company?.website}
                className="text-blue-600 underline"
              >
                Xem trang công ty
              </a>
            </div>
          </div>
          {/* 3 */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Job Detail</h2>
            <div className="w-2/3 pr-4">
              <p className="mb-2"><strong>Company:</strong> {job.company?.companyName}</p>
              <p className="mb-2"><strong>Location:</strong> {job.location}</p>
              <p className="mb-2"><strong>Experience:</strong> {job.experience}</p>
              <p className="mb-2"><strong>Employment Type:</strong> {job.employmentType}</p>
              <p className="mb-2"><strong>Vacancies:</strong> {job.vacancies}</p>
              <p className="mb-2"><strong>Gender Requirement:</strong> {job.genderRequirement}</p>
              <p className="mb-2"><strong>Skills:</strong> {job.skills?.join(', ')}</p>
              <p className="mb-2"><strong>Gender Requirement:</strong></p>
              {job.description}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;