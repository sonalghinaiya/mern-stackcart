import React from "react";

function Input({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  rightIcon,
  error,
  required = false,
}) {
  return (
    <div>
      {label && (
        <label className="text-sm font-semibold">
          {label}
          {required && <span className="text-sm font-semibold">*</span>}{" "}
        </label>
      )}

      <div className="relative mt-1">
        <input
          name={name}
          type={type}
          value={value}
          placeholder={required ? `${placeholder} *` : placeholder}
          onChange={onChange}
          className={`${className}`}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Input;
