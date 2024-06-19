import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import useAuth from "../hooks/useAuth";

const UpdateJob = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [jobData, setJobData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        const result = await response.json();
        setJobData(result);

        // Chuyển đổi định dạng ngày tháng trước khi đặt giá trị vào input
        const formattedDate = result.applicationDeadline.split("T")[0];
        result.applicationDeadline = formattedDate;

        // Tách lương thành minPrice và maxPrice
        const [minPrice, maxPrice] = result.salary
          .split(" - ")
          .map((price) => price.replace(" triệu", "").trim());
        setValue("minPrice", minPrice);
        setValue("maxPrice", maxPrice);

        // Thiết lập các giá trị mặc định khác
        setValue("title", result.title);
        setValue("location", result.location);
        setValue("experience", result.experience);
        setValue("employmentType", result.employmentType);
        setValue("position", result.position);
        setValue("vacancies", result.vacancies);
        setValue("genderRequirement", result.genderRequirement);
        setValue("applicationDeadline", formattedDate);
        setValue("description", result.description);
        setSelectedOptions(
          result.skills.map((skill) => ({ value: skill, label: skill }))
        );
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobData();
  }, [id, auth.accessToken, reset, setValue]);

  const onSubmit = async (data) => {
    data.salary = `${data.minPrice} triệu - ${data.maxPrice} triệu`;
    data.skills = selectedOptions.map((option) => option.value);
    console.log(data);

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Job Updated Successfully");
        navigate(`/company-dashboard/posted-jobs`);
      } else {
        alert(result.message || "Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Error updating job");
    }
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Java", label: "Java" },
    { value: "MySQL", label: "MySQL" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-slate-100 py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* row 1 */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                placeholder="E.g: Web Developer"
                {...register("title", { required: true })}
                className="create-job-input"
              />
              {errors.title && (
                <p className="text-red-500">Job title is required</p>
              )}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Location</label>
              <input
                type="text"
                placeholder="E.g: Hanoi"
                {...register("location", { required: true })}
                className="create-job-input"
              />
              {errors.location && (
                <p className="text-red-500">Location is required</p>
              )}
            </div>
          </div>
          {/* row 2 */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="E.g: 8 triệu"
                {...register("minPrice", { required: true })}
                className="create-job-input"
              />
              {errors.minPrice && (
                <p className="text-red-500">Minimum salary is required</p>
              )}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="E.g: 12 triệu"
                {...register("maxPrice", { required: true })}
                className="create-job-input"
              />
              {errors.maxPrice && (
                <p className="text-red-500">Maximum salary is required</p>
              )}
            </div>
          </div>
          {/* row 3 */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experience", { required: true })}
                className="create-job-input"
              >
                <option value="">Choose your experience</option>
                <option value="Dưới 1 năm">Dưới 1 năm</option>
                <option value="1-2 năm">1-2 năm</option>
                <option value="Trên 2 năm">Trên 2 năm</option>
              </select>
              {errors.experience && (
                <p className="text-red-500">Experience level is required</p>
              )}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType", { required: true })}
                className="create-job-input"
              >
                <option value="">Choose your job model</option>
                <option value="Toàn thời gian">Toàn thời gian</option>
                <option value="Bán thời gian">Bán thời gian</option>
                <option value="Thực tập">Thực tập</option>
                <option value="Khác">Khác</option>
              </select>
              {errors.employmentType && (
                <p className="text-red-500">Employment type is required</p>
              )}
            </div>
          </div>
          {/* row 4 */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Position</label>
              <input
                type="text"
                placeholder="E.g: Nhân viên"
                {...register("position", { required: true })}
                className="create-job-input"
              />
              {errors.position && (
                <p className="text-red-500">Position is required</p>
              )}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Vacancies</label>
              <input
                type="number"
                placeholder="E.g: 2"
                {...register("vacancies", { required: true })}
                className="create-job-input"
              />
              {errors.vacancies && (
                <p className="text-red-500">Number of vacancies is required</p>
              )}
            </div>
          </div>
          {/* row 5 */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Gender Requirement</label>
              <select
                {...register("genderRequirement", { required: true })}
                className="create-job-input"
              >
                <option value="">Choose gender requirement</option>
                <option value="Không yêu cầu">Không yêu cầu</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
              {errors.genderRequirement && (
                <p className="text-red-500">Gender requirement is required</p>
              )}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Application Deadline</label>
              <input
                type="date"
                {...register("applicationDeadline", { required: true })}
                className="create-job-input"
              />
              {errors.applicationDeadline && (
                <p className="text-red-500">Application deadline is required</p>
              )}
            </div>
          </div>

          {/* row 6 */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Skills Required</label>
            <CreatableSelect
              isClearable
              isMulti
              options={options}
              onChange={setSelectedOptions}
              value={selectedOptions}
            />
          </div>

          {/* row 7 */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register("description", { required: true })}
              className="pl-3 w-full py-1.5 focus:outline-none"
              rows={6}
              placeholder="Job's description"
            />
            {errors.description && (
              <p className="text-red-500">Job description is required</p>
            )}
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer hover:scale-105 transition-transform duration-300"
            value="Update Job"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
