export default function SecondaryButton({
  name,
  handleClick,
  type,
  className,
}) {
  return (
    <button className={className} type={type} onClick={handleClick}>
      {name}
    </button>
  );
}
