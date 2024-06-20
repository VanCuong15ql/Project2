import React from 'react';
import InputField from './InputField';

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <label className="sizebar-label-container">
          <input type="radio" name="location" value="" onChange={handleChange} />
          <span className="checkmark"> </span> All
        </label>
        <br />
        <InputField handleChange={handleChange} value="Ha Noi" title="Hà Nội" name="location" />
        <br />
        <InputField handleChange={handleChange} value="Da Nang" title="Đà Nẵng" name="location" />
        <br />
        <InputField handleChange={handleChange} value="Ho Chi Minh" title="Hồ Chí Minh" name="location" />
        <br />
        <InputField handleChange={handleChange} value="Other" title="Others" name="location" />
      </div>
    </div>
  );
};

export default Location;