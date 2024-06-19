import React from 'react'
import InputField from './InputField'

const EmploymentType = ({handleChange}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of Employment</h4>
      <div>
        <label className="sizebar-label-container">
          <input type="radio" name="test5"id="test5"  value="" onChange={handleChange} />
          <span className="checkmark"> </span> All
        </label>
        <br />
        <InputField
          handleChange={handleChange}
          value="full-time"
          title="Full-time"
          name="test5"
        />
        <br />
         <InputField
          handleChange={handleChange}
          value="part-time"
          title="Part-time"
          name="test5"
        />
        <br />
        
        <InputField
          handleChange={handleChange}
          value="temporary"
          title="Temporary"
          name="test5"
        />
        
       
        
      </div>
    </div>
  )
}

export default EmploymentType