import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

const Card = ({ data }) => {
  const {
    _id,
    title,
    company,
    salary,
    employmentType,
    location,
    createdAt,
    applicationDeadline
  } = data;

  console.log("Company Data:", company);

  const formattedDate = new Date(createdAt).toLocaleDateString();
  const daysLeftToApply = Math.floor(
    (new Date(applicationDeadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  return (
    <div className="card bg-white shadow-md rounded p-4 mb-4 flex items-center">
      <Link to={`/user-dashboard/job/${_id}`} className="flex items-center gap-4 w-full">
        {company && company.companyLogo ? (
          <img
            src={company.companyLogo}
            alt={company.companyName}
            className="w-20 h-20 object-contain rounded-full"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {title}
              </h3>
              <h4 className="text-primary mb-1">{company.companyName}</h4>
            </div>
            <span className="text-blue font-semibold text-md">
              {salary}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 justify-between">
            <span className="badge"><FiMapPin className="text-blue" /> {location}</span>
            <span className="badge"><FiClock className="text-blue" /> {daysLeftToApply} days left</span>
            <span className="badge"><FiCalendar className="text-blue" /> Updated {formattedDate}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;