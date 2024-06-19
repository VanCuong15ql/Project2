import React from 'react'
import Salary from '../components/Salary'
import JobpostingDate from '../components/JobpostingDate'
import WorkExperience from '../components/WorkExperience'
import EmploymentType from '../components/EmploymentType'

const SideBar = ({handleClick,handleChange}) => {
  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold mb-2'>
            Filters
        </h3>
        
        <Salary  handleChange={handleChange} handleClick={handleClick}/>
        <JobpostingDate  handleChange={handleChange}/>
        <WorkExperience  handleChange={handleChange}/>
        <EmploymentType  handleChange={handleChange}/>
    </div>
  )
}

export default SideBar