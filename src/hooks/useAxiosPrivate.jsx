import { axiosPrivate } from "./axios";
// import { useEffect } from "react";
// import useRefresh from "./useRefresh";
// import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const useAxiosPrivate = () => {
  // const refresh = useRefresh();
  // const accessToken = useSelector((state) => state.authReducer.accessToken);

  // useEffect(() => {
  //   const requestIntercept = axiosPrivate.interceptors.request.use(
  //     (config) => {
  //       if (!config.headers["authorization"]) {
  //         config.headers["authorization"] = `Bearer ${accessToken}`;
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   const responseIntercept = axiosPrivate.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const prevRequest = error?.config;
  //       if (error?.response?.status === 401 && !prevRequest?.sent) {
  //         prevRequest.sent = true;
  //         const newAccessToken = await refresh();
  //         prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
  //         return axiosPrivate(prevRequest);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axiosPrivate.interceptors.request.eject(requestIntercept);
  //     axiosPrivate.interceptors.response.eject(responseIntercept);
  //   };
  // }, [accessToken, refresh]);
  const axiosGet = async (url, params) => {
    try {
      const finalUrl = params ? `${url}?${params}` : url;
      const response = await axiosPrivate.get(finalUrl, {
        // withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status == 400) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Somthing went wrong!");
        }

        // toast.error(error?.response?.data?.msg?.slice("(").split("{")[0] + ".\n Please Check Console for more info");
      } else {
        toast.error("Somthing went wrong!");
      }
      return error;
    }
  };
  const axiosPost = async (url, data) => {
    try {
      const response = await axiosPrivate.post(url, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status == 400) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Somthing went wrong!");
        }

        // toast.error(error?.response?.data?.msg?.slice("(").split("{")[0] + ".\n Please Check Console for more info");
      } else {
        toast.error("Somthing went wrong!");
      }
      return error;
    }
  };
  const axiosPatch = async (url, data) => {
    try {
      const response = await axiosPrivate.patch(url, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status == 400) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Somthing went wrong!");
        }

        // toast.error(error?.response?.data?.msg?.slice("(").split("{")[0] + ".\n Please Check Console for more info");
      } else {
        toast.error("Somthing went wrong!");
      }
      return error;
    }
  };
  const axiosPut = async (url, data) => {
    try {
      const response = await axiosPrivate.put(url, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status == 400) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Somthing went wrong!");
        }

        // toast.error(error?.response?.data?.msg?.slice("(").split("{")[0] + ".\n Please Check Console for more info");
      } else {
        toast.error("Somthing went wrong!");
      }
      return error;
    }
  };
  const axiosDelete = async (url) => {
    try {
      const response = await axiosPrivate.delete(url);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error(
          error?.response?.data?.msg?.slice("(").split("{")[0] +
            ".\n Please Check Console for more info",
        );
      } else {
        toast.error("Somthing went wrong!");
      }
      return error;
    }
  };

  return {
    axiosPrivate,
    axiosGet,
    axiosPost,
    axiosPatch,
    axiosDelete,
    axiosPut,
  };
};

export default useAxiosPrivate;
