import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");

  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");

  const { setAuth, trusted, setTrusted } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = userType === "user" ? "/api/auth/login/user" : "/api/auth/login/company";
      const response = await axios.post(endpoint, { identifier, password });
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken; 
      const decodedToken = jwtDecode(accessToken);
      const role = decodedToken.role;
      setAuth({ ...decodedToken, accessToken });
      localStorage.setItem('refreshToken', refreshToken); 

      setIdentifier("");
      setPassword("");
      setHasError(false);

      if (role === "user") {
        navigate("/user-dashboard", { replace: true });
      } else if (role === "company") {
        navigate("/company-dashboard", { replace: true });
      }
    } catch (error) {
      setHasError(true);
      console.log(error);
      if (!error?.response) {
        setMessage("No server response");
      } else if (error.response?.status === 400) {
        setMessage(error.response.data.message || "Bad Request");
      } else {
        setMessage("Internal server error");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("trusted", trusted);
  }, [trusted]);

  const toggleTrusted = () => {
    setTrusted((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex bg-[var(--login-right-bg)]">
      <div className="h-full w-[1800px] flex items-center justify-center">
        <div className="w-[500px] h-auto gap-5 rounded-lg border-[var(--login-border-color)] flex flex-col bg-[var(--login-form-container)]">
          <div className="ml-5 mt-1 text-sm text-[var(--login-text-color)]">
            Welcome to BotCV, <br /> Login to your account.
          </div>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="ml-5 mr-5 relative">
              <label htmlFor="userType" className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs">
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
            <div className="ml-5 mr-5 relative mt-14">
              <label
                htmlFor="identifier"
                className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
              >
                Email
              </label>
              <input
                type="text"
                id="identifier"
                className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="mt-28 ml-5 mr-5 relative">
              <label
                htmlFor="password"
                className="absolute px-1 font-semibold bg-[var(--login-form-container)] left-3 z-20 text-blue text-xs"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="outline-0 absolute top-2 z-10 rounded-sm py-1.5 pl-3 w-full bg-[var(--login-form-container)] text-[var(--login-input-text-color)] border-2 border-gray-300 duration-300 hover:border-cyan-600 focus:border-blue-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-[168px] ml-5 flex justify-between items-center mr-5">
              <div className="flex justify-between items-center mt-[-20px]">
                <input
                  type="checkbox"
                  id="trusted"
                  className="checkbox-primary checkbox w-4 h-4"
                  onChange={toggleTrusted}
                  checked={trusted}
                ></input>
                <label htmlFor="trusted" className="text-sm pl-1">
                  Trust this device
                </label>
              </div>
              <button
                type="submit"
                className="inline-block w-16 h-10 bg-blue text-white font-semibold rounded-md hover:bg-blue-600 duration-300"
              >
                Login
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <span className={`flex-1 w-[100px] pl-5 ${hasError ? "text-red-600" : "text-green-600"}`}>
                {typeof message === 'string' ? message : JSON.stringify(message)}
              </span>
              <Link to="/forgot" className="mr-4">
                <div className="inline text-sm font-light text-gray-500 underline underline-offset-4">
                  Forgot password?
                </div>
                </Link>
            </div>
          </form>
          <hr className="w-[90%] self-center border-gray-300 mt-5" />
          <div className="pt-4 mt-1 px-3 flex items-center gap-2 justify-center">
            <div className="text-sm text-gray-500 font-normal">
              Don't have an account?
            </div>
            <Link to="/register" className="mr-4">
              <div className="inline text-sm font-light text-blue hover:underline underline-offset-4">
                Sign up now!
              </div>
            </Link>
          </div>
        </div>
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

export default Login;