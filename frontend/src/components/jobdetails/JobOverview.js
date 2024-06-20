import React from 'react';

const JobOverview = ({ job }) => {
  return (
    <div className="job-overview">
      <h1>{job.title}</h1>
      <div className="job-overview-details">
        <p><strong>Mức lương:</strong> {job.salary}</p>
        <p><strong>Địa điểm:</strong> {job.location}</p>
        <p><strong>Kinh nghiệm:</strong> {job.experience}</p>
        <p><strong>Hạn nộp hồ sơ:</strong> {job.deadline}</p>
      </div>
      <div className="job-overview-actions">
        <button className="apply-button">Ứng tuyển ngay</button>
        <button className="save-button">Lưu tin</button>
      </div>
    </div>
  );
};

export default JobOverview;