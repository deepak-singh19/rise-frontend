import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { constants } from "../../utility/constants";
import { useUser } from "../../context/UserContextProvider";

const VerificationCodeInput = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const location = useLocation();
  const navigate = useNavigate();
  // const queryParams = new URLSearchParams(location.search);
  // const email = queryParams.get("email");

  const { email, isMentor } = location.state;
  const {
    storeUserTokenInLocalStorage,
    setIsMentor,
    setIsLoggedIn,
    storeIsMentorInLocalStorage,
  } = useUser();
  const { axiosPost } = useAxiosPrivate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    } else if (element.previousSibling && element.value === "") {
      element.previousSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      const updatedCode = [...code];
      updatedCode[index - 1] = "";
      setCode(updatedCode);
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    console.log(verificationCode, email);
    try {
      let response;
      if (isMentor) {
        response = await axiosPost(constants.VERIFY, {
          email: email,
          code: verificationCode,
        });
      } else {
        response = await axiosPost(constants.PRODUCTVERIFY, {
          email: email,
          code: verificationCode,
        });
      }

      if (response.message === "User verified successfully") {
        console.log("Verification successful", response);
        const token = response?.token;
        if (!token) {
          console.error("Token not found");
          return;
        }
        setIsMentor(isMentor);
        setIsLoggedIn(true);
        storeUserTokenInLocalStorage(token);
        storeIsMentorInLocalStorage(isMentor);
        navigate(isMentor ? "/mentor-profile" : "/product-profile");
      } else {
        console.error("Verification failed", response);
      }
    } catch (error) {
      console.error("API call failed", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black">
      <div className="mb-4 flex items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <h1 className="mb-4 text-center text-xl font-semibold text-white">
        Enter your six-digit code you got on your email for verification
      </h1>
      <p className="mb-8 text-center text-sm text-gray-400">
        This helps us keep your account secure by verifying that it's really
        you.
      </p>
      <div className="flex space-x-2">
        {code.map((data, index) => {
          return (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              className="h-12 w-12 rounded-md border border-gray-300 bg-white text-center text-2xl font-semibold text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 rounded bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-300"
      >
        Verify
      </button>
    </div>
  );
};

export default VerificationCodeInput;
