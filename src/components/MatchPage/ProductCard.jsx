import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import { constants } from "../../utility/constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useUser } from "../../context/UserContextProvider";

export default function ProductCard({
  productId,
  companyName,
  fullName,
  email,
  skills,
  experience,
}) {
  const navigate = useNavigate();
  const { axiosPost } = useAxiosPrivate();
  const { decodeToken } = useUser();
  const userId = decodeToken(JSON.parse(localStorage.getItem("userToken"))).id;

  const initiateConversation = async ({ id }) => {
    try {
      const response = await axiosPost(constants.INITIATECONVERSATION, {
        senderId: userId,
        recieverId: id,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-8 flex w-full items-center justify-center gap-8 rounded-3xl bg-accent p-4 px-12 sm:w-1/2 md:justify-evenly md:p-8">
      <div className="my-auto hidden rounded-lg bg-white md:block md:w-48">
        <img
          src="/team-man.jpeg"
          alt="mentor"
          className="h-full w-full rounded-lg object-contain"
        />
      </div>
      <div className="flex flex-col gap-x-8 lg:flex-row">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-semibold md:text-4xl">{companyName}</h2>
          <h2 className="text-xl font-semibold md:text-4xl">{fullName}</h2>
          <p className="text-lg">{email}</p>
          <p className="text-lg">Skills: {skills}</p>
          <p className="text-lg">Experience: {experience}</p>
        </div>

        <div className="mt-4 flex flex-col justify-center gap-y-2 lg:gap-y-8">
          <PrimaryButton
            name="Message"
            type="button"
            handleClick={async () => {
              await initiateConversation({ id: productId });
              navigate("/inbox", {
                state: {
                  id: productId,
                },
              });
            }}
            className="min-w-40 max-w-60 self-center rounded bg-white p-2 font-semibold text-black transition hover:bg-gray-300"
          />
          <PrimaryButton
            name="Profile"
            type="button"
            handleClick={() => {
              navigate("/product/profile", {
                state: {
                  id: productId,
                },
              });
            }}
            className="min-w-40 max-w-60 self-center rounded bg-white p-2 font-semibold text-black transition hover:bg-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
