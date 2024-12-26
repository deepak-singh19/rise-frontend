import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { constants } from "../../utility/constants";
import { useUser } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

const MentorProfile = () => {
  const { axiosPut, axiosGet } = useAxiosPrivate();
  const { decodeToken } = useUser();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const mentorId = decodeToken(
    JSON.parse(localStorage.getItem("userToken")),
  ).id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosGet(constants.GETMENTORPROFILE + mentorId);
        if (response) {
          setProfileData(response.product);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfileData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  const formik = useFormik({
    initialValues: {
      fullName: profileData?.fullName || "",
      phoneNumber: profileData?.phoneNumber || "",
      areaOfExpertise: profileData?.areaOfExpertise.join(", ") || "",
      industryExperience: profileData?.industryExperience.join(", ") || "",
      yearsOfExperience: profileData?.yearsOfExperience || "",
      companyAssociatedWith: profileData?.companyAssociatedWith || "",
      designation: profileData?.designation || "",
      keyAchievements: profileData?.keyAchievements.join(", ") || "",
      education: profileData?.education || "",
      durationOfMentorship: profileData?.durationOfMentorship || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      areaOfExpertise: Yup.string().required("Required"),
      industryExperience: Yup.string().required("Required"),
      yearsOfExperience: Yup.string().required("Required"),
      companyAssociatedWith: Yup.string().required("Required"),
      designation: Yup.string().required("Required"),
      keyAchievements: Yup.string().required("Required"),
      education: Yup.string().required("Required"),
      durationOfMentorship: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const areaOfExpertiseToArr = values.areaOfExpertise
        .split(",")
        .map((item) => item.trim());
      const industryExperienceToArr = values.industryExperience
        .split(",")
        .map((item) => item.trim());
      const keyAchievementsToArr = values.keyAchievements
        .split(",")
        .map((item) => item.trim());
      const data = {
        ...values,
        areaOfExpertise: areaOfExpertiseToArr,
        industryExperience: industryExperienceToArr,
        keyAchievements: keyAchievementsToArr,
      };
      console.log(data);
      try {
        const response = await axiosPut(
          constants.UPDATEMENTOR + mentorId,
          data,
        );
        if (response) {
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-6 text-4xl font-bold">Complete Your Profile</h1>

      {/* <div className="relative mb-6">
        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-gray-300">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg text-gray-400">
              Upload Photo
            </div>
          )}
        </div>
        <input
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleImageChange}
        />
      </div> */}

      <div className="relative mb-6">
        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-gray-300">
          <img
            src="dppppp.jpeg"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <input
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleImageChange}
        />
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your full name"
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="text-sm text-red-500">{formik.errors.fullName}</div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your phone number"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-sm text-red-500">
              {formik.errors.phoneNumber}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Area of Expertise
          </label>
          <input
            type="text"
            name="areaOfExpertise"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.areaOfExpertise}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your area of expertise"
          />
          {formik.touched.areaOfExpertise && formik.errors.areaOfExpertise ? (
            <div className="text-sm text-red-500">
              {formik.errors.areaOfExpertise}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Industry Experience
          </label>
          <input
            type="text"
            name="industryExperience"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.industryExperience}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your industry experience"
          />
          {formik.touched.industryExperience &&
          formik.errors.industryExperience ? (
            <div className="text-sm text-red-500">
              {formik.errors.industryExperience}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Years of Experience (YOE)
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yearsOfExperience}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your years of experience"
          />
          {formik.touched.yearsOfExperience &&
          formik.errors.yearsOfExperience ? (
            <div className="text-sm text-red-500">
              {formik.errors.yearsOfExperience}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Company Associated With
          </label>
          <input
            type="text"
            name="companyAssociatedWith"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyAssociatedWith}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter the company you are associated with"
          />
          {formik.touched.companyAssociatedWith &&
          formik.errors.companyAssociatedWith ? (
            <div className="text-sm text-red-500">
              {formik.errors.companyAssociatedWith}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Current Role/Position
          </label>
          <input
            type="text"
            name="designation"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.designation}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your current role or position"
          />
          {formik.touched.designation && formik.errors.designation ? (
            <div className="text-sm text-red-500">
              {formik.errors.designation}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Key Achievements
          </label>
          <input
            type="text"
            name="keyAchievements"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.keyAchievements}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your key achievements"
          />
          {formik.touched.keyAchievements && formik.errors.keyAchievements ? (
            <div className="text-sm text-red-500">
              {formik.errors.keyAchievements}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Education</label>
          <input
            type="text"
            name="education"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.education}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your education details"
          />
          {formik.touched.education && formik.errors.education ? (
            <div className="text-sm text-red-500">
              {formik.errors.education}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Duration of Mentorship
          </label>
          <input
            type="text"
            name="durationOfMentorship"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.durationOfMentorship}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter the duration of mentorship"
          />
          {formik.touched.durationOfMentorship &&
          formik.errors.durationOfMentorship ? (
            <div className="text-sm text-red-500">
              {formik.errors.durationOfMentorship}
            </div>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-300"
          >
            Complete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MentorProfile;
