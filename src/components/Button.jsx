const Button = ({
  mode = 0,
  label,
  handleClick,
  ...props
}) => {
  const color = {
    0: "bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-700)]",
    1: "bg-[var(--color-warning-500)] hover:bg-[var(--color-warning-700)]",
    2: "bg-[var(--color-danger-500)] hover:bg-[var(--color-danger-700)]",
    3: "bg-gray-200 hover:bg-gray-300 !text-black"
  };

  return (
    <button
      type="button"
      className={`${color[mode]} transition-colors px-4 py-2 rounded-full text-white text-lg`}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;