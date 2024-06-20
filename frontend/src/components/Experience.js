import React from 'react';
import InputField from './InputField';

const Experience = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Experience</h4>
      <div>
        <label className="sizebar-label-container">
          <input type="radio" name="experience" value="" onChange={handleChange} />
          <span className="checkmark"> </span> All
        </label>
        <br />
        <InputField handleChange={handleChange} value="Dưới 1 năm" title="Dưới 1 năm" name="experience" />
        <br />
        <InputField handleChange={handleChange} value="1-2 năm" title="1-2 năm" name="experience" />
        <br />
        <InputField handleChange={handleChange} value="Trên 2 năm" title="Trên 2 năm" name="experience" />
        <br />
      </div>
    </div>
  );
};

export default Experience;