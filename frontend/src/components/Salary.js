import React from "react";
import InputField from "./InputField";

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div>
        <label className="sizebar-label-container">
          <input type="radio" name="salary" value="" onChange={handleChange} />
          <span className="checkmark"> </span> All
        </label>
        <br />
        <InputField handleChange={handleChange} value={30000} title="< 30 triệu" name="salary" />
        <br />
        <InputField handleChange={handleChange} value={50000} title="< 50 triệu" name="salary" />
        <br />
        <InputField handleChange={handleChange} value={80000} title="< 80 triệu" name="salary" />
        <br />
        <InputField handleChange={handleChange} value={100000} title="< 100 triệu" name="salary" />
        <br />
      </div>
    </div>
  );
};

export default Salary;