type InputProps = {
  value: string;
  label: string;
  type: string;
  name: string;
  id: string;
  required: boolean;
  handleChange: Function
};

export default function InputBox({
  value,
  label,
  type,
  name,
  id,
  required,
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
        onChange={(e) => handleChange(e.target.value, name)}
      />
    </>
  );
}
