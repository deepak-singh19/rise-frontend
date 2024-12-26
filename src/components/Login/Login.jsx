import { useEffect, useState } from "react";
import SecondaryButton from "../common/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { constants } from "../../utility/constants";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState(false);
  const [isMentor, setIsMentor] = useState(true);
  const { axiosPost, axiosGet } = useAxiosPrivate();
  const navigate = useNavigate();

  const primaryButtonClass =
    "bg-white text-black font-semibold py-2 px-6 rounded transition hover:bg-gray-300 w-full my-2";
  const secondaryButtonClass =
    "bg-transparent border border-white text-white font-semibold py-2 px-6 rounded transition hover:bg-gray-300 hover:text-black w-full my-2";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match",
      ),
      name: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (register) {
        try {
          const response = await axiosPost(
            isMentor ? constants.MENTORSIGNUP : constants.PRODUCTSIGNUP,
            {
              email: values.email,
              fullName: values.name,
              password: values.password,
            },
          );

          if (
            response.message === "Verification code sent to your email id" ||
            response.message === "Verification code sent to your email"
          ) {
            console.log("Registration successful", response);
            navigate("/verification-code", {
              state: { email: values.email, isMentor: isMentor },
            });
          } else if (response.status === "401 Unauthorized") {
            console.log("User already Registered try logging in");
            toast.error("User Already Registered, Try Logging In");
          }
        } catch (error) {
          console.error("API call failed", error);
        }
      }
      if (!register) {
        try {
          const response = await axiosPost(
            isMentor ? constants.MENTORSIGNIN : constants.PRODUCTSIGNIN,
            {
              email: values.email,
              password: values.password,
            },
          );

          if (
            response.message === "Verification code sent to your email id" ||
            response.message === "Verification code sent to your email"
          ) {
            console.log("Registration successful", response);
            navigate("/verification-code", {
              state: { email: values.email, isMentor: isMentor },
            });
          } else if (response.status === "401 Unauthorized") {
            console.log("User already Registered try logging in");
            toast.error("User Already Registered, Try Logging In");
          }
        } catch (error) {
          console.error("API call failed", error);
        }
      }
    },
  });

  // const fetchWorkflowList = async () => {
  //   console.log("inside submit button")

  //   try {
  //     const response = await axiosGet(constants.POSTS);

  //     if (response) {
  //       console.log(response);
  //     } else {
  //       console.error('Error fetching workflow list: ');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching workflow list: ', error);
  //   } finally {

  //   }
  // };

  // useEffect(()=>{
  //   fetchWorkflowList();
  // },[]);

  return (
    <section
      className={`flex flex-col content-center justify-center gap-y-4 ${
        register ? "" : "h-screen"
      }`}
    >
      <div className="self-center">
        <Link to="/">
          <img
            src="logo.jpg"
            alt="company logo"
            className="h-20 w-20 sm:h-28 sm:w-28"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="min-w-80">
          <h1 className="text-center text-4xl font-bold">
            {register ? "Register" : "Login"}
            {isMentor ? " as Mentor" : " as Product Owner"}
          </h1>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            {register && (
              <div>
                <label htmlFor="fullName" className="block text-2xl">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="my-2 w-full rounded-md border-gray-300 bg-accent p-2"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-2xl">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="my-2 w-full rounded-md border-gray-300 bg-accent p-2"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm text-red-500">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="block text-2xl">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="my-2 w-full rounded-md border-gray-300 bg-accent p-2"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-sm text-red-500">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            {register && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-2xl">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className="my-2 w-full rounded-md border-gray-300 bg-accent p-2"
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </>
            )}
            <div className="flex">
              <label htmlFor="show-password" className="mr-4">
                Show Password
              </label>
              <input
                type="checkbox"
                id="show-password"
                name="show-password"
                className="rounded-md p-2 accent-[#1a1a1a]"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="px-6">
              {register ? (
                <>
                  <button className={primaryButtonClass} type="submit">
                    Register
                  </button>
                  <SecondaryButton
                    name={"Already signed up? Login here"}
                    handleClick={() => setRegister(false)}
                    className={secondaryButtonClass}
                    type={"button"}
                  />
                  <SecondaryButton
                    name={
                      isMentor ? "Login as Product Owner" : "Login as Mentor"
                    }
                    handleClick={() => {
                      setIsMentor(!isMentor);
                      setRegister(false);
                    }}
                    type={"button"}
                    className={secondaryButtonClass}
                  />
                </>
              ) : (
                <>
                  <button className={primaryButtonClass} type="submit">
                    Login
                  </button>
                  <SecondaryButton
                    name={"Not signed up? Register here"}
                    handleClick={() => setRegister(true)}
                    className={secondaryButtonClass}
                    type={"button"}
                  />
                  <SecondaryButton
                    name={
                      isMentor ? "Login as Product Owner" : "Login as Mentor"
                    }
                    handleClick={() => setIsMentor(!isMentor)}
                    className={secondaryButtonClass}
                    type={"button"}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
