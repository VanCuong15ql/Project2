import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const JobDetail = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleApply = async () => {
    if (!auth?.accessToken) {
      alert("Please log in to apply.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

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
console.log(job.skills);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-slate-100 py-10 px-4 lg:px-16">
        <h1 className="text-2xl font-bold mb-5">{job.title}</h1>
        <p><strong>Company:</strong> {job.company?.companyName}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Experience:</strong> {job.experience}</p>
        <p><strong>Employment Type:</strong> {job.employmentType}</p>
        <p><strong>Vacancies:</strong> {job.vacancies}</p>
        <p><strong>Gender Requirement:</strong> {job.genderRequirement}</p>
        <p><strong>Application Deadline:</strong> {job.applicationDeadline?.split('T')[0]}</p>
        <p><strong>Skills:</strong> {job.skills?.join(', ')}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <button
          onClick={handleApply}
          className="mt-4 bg-blue text-white px-4 py-2 rounded"
        >
          Apply for Job
        </button>
      </div>
    </div>
  );
};

export default JobDetail;