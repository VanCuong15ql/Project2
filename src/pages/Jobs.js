import React from "react";

const Jobs = ({ result }) => {
  return (
    <>
      <div>
        <h3 className="font-semibold text-xl ml-5 mb-0">
          {result.length} Jobs Found !
        </h3>
        <section>{result}</section>
      </div>
      
    </>
  );
};

export default Jobs;
