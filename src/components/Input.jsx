const Input = ({ label, value, onChange, type = "text", placeholder = "" }) => {
  const baseClass =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

  const commonProps = {
    value,
    onChange,
    type,
    placeholder,
    className: baseClass,
  };

  return (
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 text-sm mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...commonProps} />
      ) : (
        <input {...commonProps} />
      )}
    </div>
  );
};

export default Input;
