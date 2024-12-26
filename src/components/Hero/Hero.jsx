import PrimaryButton from "../common/PrimaryButton";
import ThreeDModel from "./ThreeDModel";

const Hero = () => {
  const primaryButtonClass = `bg-white text-black font-semibold py-2 px-6 rounded transition hover:bg-gray-300`;
  return (
    <section className="flex h-screen items-center justify-between bg-black px-10 text-center text-white">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-4 p-4 text-6xl font-bold sm:px-8 lg:px-20">
          Ri5E Above Achieve Beyond
        </h1>
        <p className="mb-8 text-2xl md:text-4xl">
          Empowering Early-Stage Success Through Innovation
        </p>
        <PrimaryButton name="Learn More" className={primaryButtonClass} />
      </div>
      <div className="flex w-1/2 items-center justify-center max-sm:hidden">
        <ThreeDModel />
      </div>
    </section>
  );
};

export default Hero;
