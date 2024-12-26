import TeamCard from "./TeamCard";

export default function Team() {
  return (
    <section id="team" className="bg-black text-white p-4 text-center">
      <div>
        <h2 className="text-4xl font-bold p-2">Our Team</h2>
        <p className="text-2xl p-2">
          Our team is made up of the best engineers and designers from around
          the world.
        </p>
      </div>
      <div className="flex flex-col flex-wrap items-center gap-12 p-8 mt-2 md:justify-around md:flex-row">
        <TeamCard name="Nikhil Damwani" />
      </div>
    </section>
  );
}
