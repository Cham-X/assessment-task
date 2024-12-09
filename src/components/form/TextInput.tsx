import React, { useState, ReactNode } from "react";

export const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const USERNAME_REGEX = /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/;

type TextInputProps = {
    inputLabel: string;
    overrideStyles?: string;
    errors: Record<string, any>;
    placeholder?: string;
    formType?: string;
    required?: boolean;
    emptyErrorMessage?: string;
    patternErrorMessage?: string;
    regexPattern?: RegExp | null;
    maxLengthErrorMessage?: string;
    minLengthErrorMessage?: string;
    maxLength?: number | null;
    minLength?: number | null;
    disableUsernameRegex?: boolean;
    children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = ({
    inputLabel,
    overrideStyles,
    placeholder,
    formType = "text",
    required = true,
    emptyErrorMessage = "Field is required",
    patternErrorMessage = "Enter valid value",
    regexPattern = null,
    maxLengthErrorMessage = "Maximum length exceeded",
    minLengthErrorMessage = "Minimum length required",
    maxLength = null,
    minLength = null,
    value,
    onChange,
    children,
    ...otherProps
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validateField = (value: string) => {
        if (!value && required) {
            setErrorMessage(emptyErrorMessage);
            return false;
        }
        if (regexPattern && !regexPattern.test(value)) {
            setErrorMessage(patternErrorMessage);
            return false;
        }
        if (formType === "email" && !EMAIL_ADDRESS_REGEX.test(value)) {
            setErrorMessage("Please enter a valid email address.");
            return false;
        }
        if (
            inputLabel === "username" &&
            !USERNAME_REGEX.test(value)
        ) {
            setErrorMessage(
                "Username can only contain letters, numbers, and underscores, and must start and end with a letter or number."
            );
            return false;
        }
        if (minLength && value.length < minLength) {
            setErrorMessage(`Minimum length is ${minLength}`);
            return false;
        }
        if (maxLength && value.length > maxLength) {
            setErrorMessage(`Maximum length is ${maxLength}`);
            return false;
        }
        setErrorMessage(null); // Clear error if validation passes
        return true;
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.target.value);
    //     setErrorMessage(null); // Clear error message on user input
    //     otherProps.onChange?.(e); // Ensure any additional onChange handler is called
    // };

    return (
        <div className="input-wrapper">
            <label
                htmlFor={inputLabel}
                className="mb-1 text-sm font-medium text-gray-700"
            >
                {inputLabel}
            </label>
            <input
                {...otherProps}
                className={`text-input ${errorMessage ? 'error' : ''} ${overrideStyles || ''}`}
                placeholder={placeholder}
                name={inputLabel}
                id={inputLabel}
                type={formType}
                value={value} // Controlled component
                onChange={onChange} // Update state and clear errors
                onBlur={(e) => validateField(e.target.value)} // Validate on blur
            />
            {errorMessage && (
                <span className="form-error">{errorMessage}</span>
            )}
            {children}
        </div>
    );
};

export default TextInput;
