type InputProps = {
  value: string;
  label?: string;
  type: string;
  name: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  handleChange: Function
};

export default function InputBox({
  value,
  label,
  type,
  name,
  id,
  required,
  placeholder,
  handleChange
}: InputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value, name)}
      />
    </>
  );
}
