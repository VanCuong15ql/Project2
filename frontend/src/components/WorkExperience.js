import React from 'react'
import InputField from './InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div>
        <label className="sizebar-label-container">
          <input type="radio" name="test4"id="test4"  value="" onChange={handleChange} />
          <span className="checkmark"> </span> Any experience
        </label>
        <br />
        <InputField
          handleChange={handleChange}
          value="Internship"
          title="Internship"
          name="test4"
          
        />
        <br />
        <InputField
          handleChange={handleChange}
          value="Work Remotely"
          title="Work Remotely"
          name="test4"
        />
        <br />
      </div>
    </div>
  )
}

export default WorkExperience