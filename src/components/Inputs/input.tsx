import { useState } from "react";

type InputProps = {
  value: string;
  label?: string;
  type: string;
  name: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  handleChange: Function;
};

export default function InputBox({
  value,
  label,
  type,
  name,
  id,
  required,
  placeholder,
  handleChange,
}: InputProps) {
  const [showPassword, setShowPassWord] = useState(false);

  const handleTogglePassword = () => {
    setShowPassWord(!showPassword);
  };
  return (
    <div className="form-control">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-wrapper">
        <input
          type={showPassword ? "text" : type}
          id={id}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value, name)}
        />
        {type === "password" && (
          <button
          data-testid="password-toggle"
            type="button"
            className="toggle-password-button"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}
