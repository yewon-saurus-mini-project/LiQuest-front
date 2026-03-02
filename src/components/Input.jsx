const Input = ({
  label,
  value,
  onChange,
  type='text',
  placeholder=''
}) => {
  return (
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 text-sm mb-2" for='grid-id'>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
    </div>
  )
}

export default Input;