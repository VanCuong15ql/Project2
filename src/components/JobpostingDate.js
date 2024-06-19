import React from "react";
import InputField from "./InputField";

const JobpostingDate = ({handleChange}) => {
  const now = new Date();
  const inTwentyFourHours = new Date(now - 24 * 60 * 60 * 1000);
  const inSevenDays = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const inThirtyDays = new Date(now - 30 * 24 * 60 * 60 * 1000);


  //convert date to string
  const twentyFourHoursAgoDate = inTwentyFourHours.toISOString().slice(0, 10);
  const sevenDaysAgoDate = inSevenDays.toISOString().slice(0, 10);
  const thirtyDaysAgoDate = inThirtyDays.toISOString().slice(0, 10);
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Posting Date</h4>
      <div>
        <label className="sizebar-label-container">
          <input
            type="radio"
            name="test3"
            id="test3"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"> </span> All time
        </label>
        <br />
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 hours"
          name="test3"
        />
        <br />
        <InputField
          handleChange={handleChange}
          value={sevenDaysAgoDate}
          title="Last 7 days"
          name="test3"
        />
        <br />
        <InputField
          handleChange={handleChange}
          value={thirtyDaysAgoDate}
          title="Last Month"
          name="test3"
        />
      </div>
    </div>
  );
};

export default JobpostingDate;
