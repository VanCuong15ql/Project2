import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        const result = await response.json();
        setUserData(result);


        setValue("email", result.email);
        setValue("fullName", result.fullName);
        setValue("phoneNumber", result.phoneNumber);
        setValue("address", result.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [auth.accessToken, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/me', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Profile Updated Successfully");
        setUserData(result);
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-10">
      <div className="bg-slate-100 py-10 px-4 lg:px-16">
        <h1 className="text-2xl font-bold mb-5">User Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-lg">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="create-job-input"
              disabled
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <div>
            <label className="block mb-2 text-lg">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: true })}
              className="create-job-input"
            />
            {errors.fullName && <p className="text-red-500">Full name is required</p>}
          </div>
         
          <div>
            <label className="block mb-2 text-lg">New Password</label>
            <input
              type="password"
              {...register("password")}
              className="create-job-input"
            />
          </div>
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer hover:scale-105 transition-transform duration-300"
            value="Update Profile"
          />
        </form>
      </div>
    </div>
  );
};

export default UserProfile;