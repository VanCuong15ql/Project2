import React from 'react';
import InputField from './InputField';

const GenderRequirement = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Gender Requirement</h4>
      <div>
        <label className="sizebar-label-container">
          <input type="radio" name="genderRequirement" value="" onChange={handleChange} />
          <span className="checkmark"> </span> Không yêu cầu
        </label>
        
        <br />
        <InputField handleChange={handleChange} value="Nam" title="Nam" name="genderRequirement" />
        <br />
        <InputField handleChange={handleChange} value="Nữ" title="Nữ" name="genderRequirement" />
        <br />
        <InputField handleChange={handleChange} value="Khác" title="Khác" name="genderRequirement" />
      </div>
    </div>
  );
};

export default GenderRequirement;