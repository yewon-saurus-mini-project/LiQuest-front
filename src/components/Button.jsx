const Button = ({
  mode = 0,
  label,
  handleClick,
  isLong = false,
  ...props
}) => {
  const color = {
    0: "bg-[var(--color-primary-500)] border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)]",
    1: "bg-[var(--color-warning-500)] border-[var(--color-warning-500)] hover:text-[var(--color-warning-500)]",
    2: "bg-[var(--color-danger-500)] border-[var(--color-danger-500)] hover:text-[var(--color-danger-500)]",
    3: "bg-gray-300 border-gray-300 !text-black"
  };

  return (
    <button
      type="button"
      className={`${color[mode]} ${isLong ? 'w-full' : ''} border transition-colors px-4 py-2 rounded-full text-white text-lg hover:bg-white`}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;