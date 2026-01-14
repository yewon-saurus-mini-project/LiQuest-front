const Button = ({
  children,
  mode = "primary",
  onClick,
  isLong = false,
  customStyle = null,
  ...props
}) => {
  const styleTable = {
    "custom": customStyle,
    "primary": "bg-[var(--color-primary-500)] border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)]",
    "warning": "bg-[var(--color-warning-500)] border-[var(--color-warning-500)] hover:text-[var(--color-warning-500)]",
    "danger": "bg-[var(--color-danger-500)] border-[var(--color-danger-500)] hover:text-[var(--color-danger-500)]",
    "cancle": "bg-gray-300 border-gray-300 !text-black"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styleTable[mode]} ${isLong ? 'w-full' : ''} border transition-colors px-4 py-2 rounded-full text-white text-lg hover:bg-white`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;