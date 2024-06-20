import React from 'react';

const CompanyInfo = ({ company }) => {
  return (
    <div className="company-info">
      <h3>{company.name}</h3>
      <p><strong>Quy mô:</strong> {company.size}</p>
      <p><strong>Địa điểm:</strong> {company.address}</p>
      <a href={company.website} target="_blank" rel="noopener noreferrer">Xem trang công ty</a>
    </div>
  );
};

export default CompanyInfo;