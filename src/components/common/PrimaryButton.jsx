export default function PrimaryButton({ name, handleClick, type, className }) {
  return (
    <button className={className} type={type} onClick={handleClick}>
      {name}
    </button>
  );
}
