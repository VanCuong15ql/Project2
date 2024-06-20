import React from 'react';
import Experience from '../components/Experience';
import EmploymentType from '../components/EmploymentType';
import GenderRequirement from '../components/GenderRequirement';
import Location from '../components/Location';
import JobPostingDate from '../components/JobpostingDate';

const SideBar = ({ handleChange }) => {
  return (
    <div className='space-y-5'>
      <h3 className='text-lg font-bold mb-2'>Filters</h3>
      <Experience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
      <GenderRequirement handleChange={handleChange} />
      <Location handleChange={handleChange} />
      <JobPostingDate handleChange={handleChange} />
    </div>
  );
};

export default SideBar;