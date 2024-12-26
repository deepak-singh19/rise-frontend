import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useUser } from "../../context/UserContextProvider";
import { constants } from "../../utility/constants";

export default function MentorCard({
  mentorId,
  mentorName,
  mentorEmail,
  mentorSkills,
  mentorExperience,
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
      <div className="flex flex-col gap-x-4 md:w-96">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-semibold md:text-4xl">{mentorName}</h2>
          <p className="text-lg">{mentorEmail}</p>
          <p className="text-lg">Skills: {mentorSkills}</p>
          <p className="text-lg">Experience: {mentorExperience}</p>
        </div>

        <div className="mt-4 flex flex-col justify-center gap-y-2 lg:gap-y-8">
          <PrimaryButton
            name="Message"
            type="button"
            handleClick={async () => {
              await initiateConversation({ id: mentorId });
              navigate("/inbox", {
                state: {
                  id: mentorId,
                },
              });
            }}
            className="min-w-40 max-w-60 self-center rounded bg-white p-2 font-semibold text-black transition hover:bg-gray-300"
          />
          {/* <Calendly /> */}
        </div>
      </div>
    </div>
  );
}
