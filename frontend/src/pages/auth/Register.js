import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Tippy from "@tippyjs/react";
import useAuth from "../../hooks/useAuth";

const USERNAME_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_?]).{6,24}$/;
const EMAIL_REGEX = /^([^\s@]+@[^\s@]+\.[^\s@]+)$/;

function UsernameTooltip({ status, hasText }) {
  return `Username must contain 4 to 24 characters and start with a letter ${
    hasText === "" ? "" : status ? "✅" : "❌"
  } `;
}
function PasswordTooltip({ status, hasText }) {
  return `Password must contain 6 to 24 characters, must include uppercase and lowercase letters,
     a number, a special character ${
       hasText === "" ? "" : status ? "✅" : "❌"
     }`;
}
function EmailTooltip({ status, hasText }) {
  return `Must be a valid email address ${
    hasText === "" ? "" : status ? "✅" : "❌"
  }`;
}
function PasswordCfTooltip({ status, hasText }) {
  return `Make sure your confirm password matches the one entered above ${
    hasText === "" ? "" : status ? "✅" : "❌"
  }`;
}

function Register() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const toHomePage = async () => {
    setAuth(tmpAuth);
    navigate("/user-dashboard", { replace: true });
  };

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [cfPassword, setCfPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");

  const [userType, setUserType] = useState("user");

  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");

  const [tmpAuth, setTmpAuth] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === cfPassword);
  }, [password, cfPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === "user" && !validName) {
      setHasError(true);
      setMessage("Not a valid username");
      return;
    } else if (!validEmail) {
      setHasError(true);
      setMessage("Not a valid email");
      return;
    } else if (!validPwd) {
      setHasError(true);
      setMessage("Not a valid password");
      return;
    } else if (!validMatch) {
      setHasError(true);
      setMessage("Confirm password doesn't match");
      return;
    }

    if (userType === "company") {
      if (!companyName) {
        setHasError(true);
        setMessage("Company name is required");
        return;
      }
      if (!companyLogo) {
        setHasError(true);
        setMessage("Company logo is required");
        return;
      }
      if (!description) {
        setHasError(true);
        setMessage("Description is required");
        return;
      }
      if (!industry) {
        setHasError(true);
        setMessage("Industry is required");
        return;
      }
      if (!website) {
        setHasError(true);
        setMessage("Website is required");
        return;
      }
    }

    try {
      let response;
      if (userType === "user") {
        response = await axios.post("/api/auth/register/user", {
          email,
          password,
          fullName: username,
        });
      } else if (userType === "company") {
        response = await axios.post("/api/auth/register/company", {
          email,
          password,
          companyName,
          companyLogo,
          description,
          industry,
          website,
        });
      }

      const accessToken = response?.data?.accessToken;
      const image = response?.data?.image;

      let authData = {
        email,
        accessToken,
        image,
      };

      if (userType === "user") {
        authData = {
          ...authData,
          username,
        };
      } else if (userType === "company") {
        authData = {
          ...authData,
          companyName,
          companyLogo,
          description,
          industry,
          website,
        };
      }

      setTmpAuth(authData);
      setUsername("");
      setEmail("");
      setPassword("");
      setCfPassword("");
      setCompanyName("");
      setCompanyLogo("");
      setDescription("");
      setIndustry("");
      setWebsite("");
      setHasError(false);
      setSuccess(true);
    } catch (error) {
      setHasError(true);
      if (!error?.response) {
        setMessage("No server response");
      } else if (error.response?.status === 409) {
        if (error.response.data.taken === 1) setMessage("Email taken");
        else setMessage("Username taken");
      } else {
        setMessage("Registration failed");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex bg-[var(--login-right-bg)]">
      <div className="h-full w-[1800px] flex items-center justify-center">
        {!success ? (
          <div className="w-[500px] h-auto gap-5 rounded-lg border-[var(--login-border-color)] flex flex-col bg-[var(--login-form-container)]">
            <div className="ml-5 mt-1 text-sm text-[var(--login-text-color)]">
              Welcome to BotCV, <br></br>
              Create your account.
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-2 flex flex-col gap-[3rem]"
            >
              <div className="ml-5 mr-5 relative">
                <label
                  htmlFor="userType"
                  className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                >
                  Select User Type
                </label>
                <select
                  id="userType"
                  className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="company">Company</option>
                </select>
              </div>
              {userType === "user" && (
                <div className="ml-5 mr-5 relative">
                  <label
                    htmlFor="username"
                    className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                  >
                    Username
                  </label>
                  <Tippy
                    hideOnClick="false"
                    placement={`right`}
                    trigger="focus"
                    arrow={true}
                    content={
                      <UsernameTooltip status={validName} hasText={username} />
                    }
                  >
                    <input
                      type="text"
                      id="username"
                      autoComplete="off"
                      className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full text-[var(--login-input-text-color)] bg-[var(--login-form-container)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue-700"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Tippy>
                </div>
              )}

              <div className=" ml-5 mr-5 relative">
                <label
                  htmlFor="email"
                  className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                >
                  Email
                </label>
                <Tippy
                  hideOnClick="false"
                  placement="right"
                  trigger="focus"
                  arrow={true}
                  content={<EmailTooltip status={validEmail} hasText={email} />}
                >
                  <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Tippy>
              </div>

              <div className=" ml-5 mr-5 relative">
                <label
                  htmlFor="password"
                  className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                >
                  Password
                </label>
                <Tippy
                  hideOnClick="false"
                  placement="right"
                  trigger="focus"
                  content={
                    <PasswordTooltip status={validPwd} hasText={password} />
                  }
                >
                  <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Tippy>
              </div>

              <div className=" ml-5 mr-5 relative">
                <label
                  htmlFor="password-cf"
                  className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                >
                  Confirm Password
                </label>
                <Tippy
                  hideOnClick="false"
                  placement="right"
                  trigger="focus"
                  content={
                    <PasswordCfTooltip
                      status={validMatch}
                      hasText={cfPassword}
                    />
                  }
                >
                  <input
                    type="password"
                    id="password-cf"
                    autoComplete="off"
                    className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                    value={cfPassword}
                    onChange={(e) => setCfPassword(e.target.value)}
                  />
                </Tippy>
              </div>

              {userType === "company" && (
                <>
                  <div className=" ml-5 mr-5 relative">
                    <label
                      htmlFor="companyName"
                      className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      autoComplete="off"
                      className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div className=" ml-5 mr-5 relative">
                    <label
                      htmlFor="companyLogo"
                      className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                    >
                      Company Logo URL
                    </label>
                    <input
                      type="text"
                      id="companyLogo"
                      autoComplete="off"
                      className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                      value={companyLogo}
                      onChange={(e) => setCompanyLogo(e.target.value)}
                    />
                  </div>

                  <div className=" ml-5 mr-5 relative">
                    <label
                      htmlFor="industry"
                      className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                    >
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      autoComplete="off"
                      className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>

                  <div className=" ml-5 mr-5 relative">
                    <label
                      htmlFor="website"
                      className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                    >
                      Website URL
                    </label>
                    <input
                      type="text"
                      id="website"
                      autoComplete="off"
                      className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className=" ml-5 mr-5 relative">
                    <label
                      htmlFor="description"
                      className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      autoComplete="off"
                      className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className=" flex justify-end mr-5 mt-10">
                <span
                  className={`flex-1 max-w-[200px] pl-0 pr-1 ${
                    hasError ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message}
                </span>

                <button
                  type="submit"
                  className=" w-20 h-10 bg-blue text-white font-semibold rounded-md hover:bg-blue duration-300"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="pt-4 mt-0 px-3 flex items-center gap-2 justify-center">
              <div className=" text-sm text-gray-500 font-normal ">
                Already have an account ?
              </div>

              <Link to="/login" className="mr-4">
                <div className="inline text-sm font-light text-blue hover:underline underline-offset-4">
                  Login now!
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-lg max-w-[340px] py-5 px-5 border-2 border-gray-300 shadow-xl flex flex-col ">
              <span className="text-gray-600 mt-3">
                Your registered account
              </span>
              <div className="border-2 flex justify-between items-center px-5 py-3 rounded-md bg-slate-50">
                <div className="w-[100px] flex-[0.3] justify-center flex"></div>
                <div className="flex-[1] text-left px-5">
                  <p className="text-sm text-black truncate max-w-[230px]">
                    {tmpAuth.email}
                  </p>
                </div>
              </div>

              <button
                className="w-[60%] h-10 rounded-md bg-blue border-gray-600 border self-center my-5 text-white hover:shadow-md duration-300"
                onClick={() => toHomePage()}
              >
                Proceed login
              </button>

              <div className="border-t-2 pt-4 mt-4 px-3 flex items-center">
                <div className="text-md text-gray-500 font-normal">
                  Register as different account ?
                </div>

                <button
                  onClick={() => {
                    setSuccess(false);
                    setTmpAuth(null);
                  }}
                  className=" ml-2 w-20 h-10 bg-gray-500 text-white font-semibold rounded-md p-1 text-sm hover:bg-gray-600 duration-300"
                >
                  Try again
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="h-full w-[750px] bg-gradient-to-b from-[#191714] to-[#2234AE] text-white p-4 text-center md:text-left">
        <div className="flex flex-col ml-2 h-full gap-6">
          <h1 className="text-5xl font-bold mb-5 mt-[150px]">
            Bot<span className="text-blue">CV</span>
          </h1>
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-bold mb-2">One Love</h2>
            <h2 className="text-4xl font-bold mb-2">One Future</h2>
            <p>BotCV - #1 Recruitment Website in Vietnam</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
