import SecondaryButton from "../common/SecondaryButton";
import Icosahedral from "./Icosahedral";

const Vision = () => {
  const secondaryButtonClass = `bg-transparent border border-white text-white font-semibold py-2 px-6 rounded transition hover:bg-gray-300 hover:text-black`;
  return (
    <section
      id="vision"
      className="bg-black min-h-64 text-white sm:h-screen flex items-center justify-between px-10 text-center"
    >
      <div className="w-1/2 max-sm:hidden">
        <Icosahedral />
      </div>
      <div className="max-w-lg mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Ri5E is transforming industries and pioneering new ones
        </h1>
        <p className="text-2xl md:text-4xl mb-8">
          Design. Engineering. Marketing. Investment. Education.
        </p>
        <SecondaryButton
          name="VIEW PORTFOLIO"
          className={secondaryButtonClass}
        />
      </div>
    </section>
  );
};

export default Vision;
