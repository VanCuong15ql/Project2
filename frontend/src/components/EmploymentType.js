import React from 'react';
import InputField from './InputField';

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of Employment</h4>
      <div>
        <label className="sizebar-label-container">
          <input type="radio" name="employmentType" value="" onChange={handleChange} />
          <span className="checkmark"> </span> All
        </label>
        <br />
        <InputField handleChange={handleChange} value="Toàn thời gian" title="Toàn thời gian" name="employmentType" />
        <br />
        <InputField handleChange={handleChange} value="Bán thời gian" title="Bán thời gian" name="employmentType" />
        <br />
        <InputField handleChange={handleChange} value="Thực tập" title="Thực tập" name="employmentType" />
        
      </div>
    </div>
  );
};

export default EmploymentType;