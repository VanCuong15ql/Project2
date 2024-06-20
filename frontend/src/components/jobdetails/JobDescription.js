import React from 'react';

const JobDescription = ({ description, requirements }) => {
  return (
    <div className="job-description">
      <h2>Chi tiết tin tuyển dụng</h2>
      <h3>Mô tả công việc</h3>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <h3>Yêu cầu ứng viên</h3>
      <div dangerouslySetInnerHTML={{ __html: requirements }} />
    </div>
  );
};

export default JobDescription;