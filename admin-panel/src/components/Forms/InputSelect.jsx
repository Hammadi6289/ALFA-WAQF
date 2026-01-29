import React from "react";

const InputSelect = ({ label, value, setValue, options }) => {
  return (
    <div className="mb-3">
      <label htmlFor="" className="form-label">
        {label}
      </label>
      <select
        className="form-select mb-3"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Default select example"
      >
        {options?.map((option, index) => (
          <option value={option} key={index + 1}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
