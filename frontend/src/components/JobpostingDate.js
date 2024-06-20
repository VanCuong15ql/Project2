import React from 'react';
import InputField from './InputField';

const JobPostingDate = ({ handleChange }) => {
  const now = new Date();
  console.log(now);
  const inTwentyFourHours = new Date(now - 24 * 60 * 60 * 1000);
  const inSevenDays = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const inThirtyDays = new Date(now - 30 * 24 * 60 * 60 * 1000);
  console.log(inTwentyFourHours);
  const twentyFourHoursAgoDate = inTwentyFourHours.toISOString();
  const sevenDaysAgoDate = inSevenDays.toISOString();
  const thirtyDaysAgoDate = inThirtyDays.toISOString();

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Posting Date</h4>
      <div>
        <label className="sizebar-label-container">
          <input
            type="radio"
            name="postingDate"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"> </span> All time
        </label>
        <br />
        <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title="24 giờ qua" name="postingDate" />
        <br />
        <InputField handleChange={handleChange} value={sevenDaysAgoDate} title="Tuần này" name="postingDate" />
        <br />
        <InputField handleChange={handleChange} value={thirtyDaysAgoDate} title="Tháng này" name="postingDate" />
      </div>
    </div>
  );
};

export default JobPostingDate;