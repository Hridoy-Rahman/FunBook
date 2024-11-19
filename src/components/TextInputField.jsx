import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const TextInputField = React.forwardRef(
  ({ type, styles, placeholder, label, labelStyles, register, name, error }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div className="relative">
          <input
            type={type === "password" && showPassword ? "text" : type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={!!error}
          />
          {type === "password" && (
            <div
              className="absolute right-4 top-3 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-[#f64949fe] mt-0.5">{error}</p>}
      </div>
    );
  }
);

export default TextInputField;
