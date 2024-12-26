// eslint-disable-next-line react/prop-types
export default function TeamCard({ name }) {
  return (
    <div className="min-h-48 p-8 bg-accent rounded-2xl md:p-16">
      <img
        src="team-man.jpeg"
        alt="Team member"
        className="rounded-full h-40 w-40 inline-block object-cover md:h-48 md:w-48"
      />
      <h3 className="mt-2 p-2 text-xl"> {name}</h3>
    </div>
  );
}
