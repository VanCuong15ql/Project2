import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const CompanyProfile = () => {
  const { auth } = useAuth();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/company/profile', {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        });
        setCompany(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching company profile:', error);
        setIsLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleFileChange = (e) => {
    setCompany({ ...company, companyLogo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(company).forEach(key => {
      formData.append(key, company[key]);
    });

    try {
      const response = await axios.put('http://localhost:5000/api/company/profile', formData, {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setCompany(response.data);
    } catch (error) {
      console.error('Error updating company profile:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company profile not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-4">
        <div className="flex items-center mb-4">
          {company.companyLogo ? (
            <img
              src={typeof company.companyLogo === 'string' ? company.companyLogo : URL.createObjectURL(company.companyLogo)}
              alt={company.companyName}
              className="w-20 h-20 object-contain rounded-full mr-4"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              No Image
            </div>
          )}
          <input
            type="file"
            name="companyLogo"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={company.companyName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={company.email}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={company.description}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Industry
          </label>
          <input
            type="text"
            name="industry"
            value={company.industry}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={company.website}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default CompanyProfile;