import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { constants } from "../../utility/constants";
import { useUser } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

const MentorProfile = () => {
  const { axiosPut, axiosGet } = useAxiosPrivate();
  const { decodeToken } = useUser();
  const prductOwnerId = decodeToken(
    JSON.parse(localStorage.getItem("userToken")),
  ).id;
  const navigate = useNavigate();
  const [productOwnerData, setProductOwnerData] = useState(null);

  const [companyLogo, setCompanyLogo] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogo(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosGet(
          constants.GETPRODUCTPROFILE + prductOwnerId,
        );
        console.log(response);
        if (response) {
          const date = new Date(response.product?.dateOfOperations);
          const formattedDate = date.toISOString().split("T")[0];
          setProductOwnerData({
            ...response.product,
            dateOfOperations: formattedDate,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfileData();
  }, []);

  const formik = useFormik({
    initialValues: {
      companyName: productOwnerData?.companyName || "",
      fullName: productOwnerData?.fullName || "",
      coFounder: productOwnerData?.coFounder || "",
      phoneNumber: productOwnerData?.phoneNumber || "",
      companyVision: productOwnerData?.companyVision || "",
      dateOfOperations: productOwnerData?.dateOfOperations || "",
      industry: productOwnerData?.industry || "",
      skills: productOwnerData?.skills?.join(", ") || "",
      profitOrLoss: productOwnerData?.profitOrLoss || "",
      networth: productOwnerData?.networth || "",
      revenue: productOwnerData?.revenue || "",
      previousFunding: productOwnerData?.previousFunding ? "yes" : "no",
      stageOfCompany: productOwnerData?.stageOfCompany || "",
      durationOfMentorship: productOwnerData?.durationOfMentorship || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      companyName: Yup.string().required("Required"),
      fullName: Yup.string().required("Required"),
      coFounder: Yup.string(),
      phoneNumber: Yup.string().required("Required"),
      companyVision: Yup.string().required("Required"),
      dateOfOperations: Yup.date().required("Required"),
      industry: Yup.string().required("Required"),
      skills: Yup.string().required("Required"),
      profitOrLoss: Yup.string().required("Required"),
      networth: Yup.string().required("Required"),
      revenue: Yup.string().required("Required"),
      previousFunding: Yup.string()
        .oneOf(["yes", "no"], "Previous funding must be either 'yes' or 'no'")
        .required("Required"),
      stageOfCompany: Yup.string().required("Required"),
      durationOfMentorship: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const skillsToArr = values.skills.split(",").map((item) => item.trim());
      const previousFundingToBoolean =
        values.previousFunding === "yes" ? true : false;
      const data = {
        ...values,
        previousFunding: previousFundingToBoolean,
        skills: skillsToArr,
      };
      try {
        const response = await axiosPut(
          constants.UPDATEPRODUCT + prductOwnerId,
          data,
        );
        console.log(response);

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
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
        Complete Your Product Profile
      </h1>

      {/* <div className="relative mb-6">
        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-gray-300">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt="Company Logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute top-1/2 h-full w-full -translate-x-1 -translate-y-[25%] text-center text-lg text-gray-400">
              Upload Company Logo
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
            src="/company_logo.jpg"
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
          <label className="mb-1 block text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your company name"
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <div className="text-sm text-red-500">
              {formik.errors.companyName}
            </div>
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Founder Name</label>
          <input
            type="text"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter founder name"
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="text-sm text-red-500">{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Co-founder Name
          </label>
          <input
            type="text"
            name="coFounder"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.coFounder}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter Co-founder name"
          />
          {formik.touched.coFounder && formik.errors.coFounder ? (
            <div className="text-sm text-red-500">
              {formik.errors.coFounder}
            </div>
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
            Company Vision
          </label>
          <textarea
            rows={3}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            name="companyVision"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyVision}
            placeholder="Enter your area of expertise"
          />
          {formik.touched.companyVision && formik.errors.companyVision ? (
            <div className="text-sm text-red-500">
              {formik.errors.companyVision}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Date of Operations
          </label>
          <input
            type="date"
            name="dateOfOperations"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfOperations}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your industry experience"
          />
          {formik.touched.dateOfOperations && formik.errors.dateOfOperations ? (
            <div className="text-sm text-red-500">
              {formik.errors.dateOfOperations}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Industry</label>
          <input
            type="text"
            name="industry"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.industry}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your Industry"
          />
          {formik.touched.industry && formik.errors.industry ? (
            <div className="text-sm text-red-500">{formik.errors.industry}</div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.skills}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter the company you are associated with"
          />
          {formik.touched.skills && formik.errors.skills ? (
            <div className="text-sm text-red-500">{formik.errors.skills}</div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Profit / Loss
          </label>
          <input
            type="text"
            name="profitOrLoss"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.profitOrLoss}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your current profit/loss"
          />
          {formik.touched.profitOrLoss && formik.errors.profitOrLoss ? (
            <div className="text-sm text-red-500">
              {formik.errors.profitOrLoss}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Networth (USD){" "}
          </label>
          <input
            type="number"
            name="networth"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.networth}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your networth"
          />
          {formik.touched.networth && formik.errors.networth ? (
            <div className="text-sm text-red-500">{formik.errors.networth}</div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Revenue</label>
          <input
            type="text"
            name="revenue"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.revenue}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your current revenue"
          />
          {formik.touched.revenue && formik.errors.revenue ? (
            <div className="text-sm text-red-500">{formik.errors.revenue}</div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Previous Funding
          </label>
          <input
            type="text"
            name="previousFunding"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.previousFunding}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter your previous funding details"
          />
          {formik.touched.previousFunding && formik.errors.previousFunding ? (
            <div className="text-sm text-red-500">
              {formik.errors.previousFunding}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Stage of Company
          </label>
          <input
            type="text"
            name="stageOfCompany"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stageOfCompany}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter the stage of your company"
          />
          {formik.touched.stageOfCompany && formik.errors.stageOfCompany ? (
            <div className="text-sm text-red-500">
              {formik.errors.stageOfCompany}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Mentorship Duration
          </label>
          <input
            type="text"
            name="durationOfMentorship"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.durationOfMentorship}
            className="w-full rounded-lg bg-gray-900 p-3 text-white focus:outline-none"
            placeholder="Enter the duration of mentorship that you require"
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
