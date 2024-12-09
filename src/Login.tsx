import React from 'react'
import { useState } from 'react';
import CustomButton from './components/custom-button/CustomButton';
import TextInput from './components/form/TextInput';
import { useNavigate } from 'react-router-dom';
import { EMAIL_ADDRESS_REGEX, USERNAME_REGEX } from './components/form/TextInput';
import { useFormContext } from './context/FormContext';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const { username, setUsername } = useFormContext()

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: null,
        username: null,
        password: null,
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors: any = {};

        if (!EMAIL_ADDRESS_REGEX.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        if (!USERNAME_REGEX.test(formData.username)) {
            newErrors.username = "Username can only contain letters, numbers, and underscores, and must start and end with a letter or number.";
            valid = false;
        }

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            setUsername(formData.username)
            console.log(formData)
            setTimeout(() => {
                setIsLoading(false);
                navigate("/todolist"); // Navigate to the next page after success
            }, 1000);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-2 w-[50vw]"
        >
            <TextInput
                errors={errors}
                inputLabel="email"
                placeholder="Email address"
                emptyErrorMessage="Email Address is empty"
                autoComplete="email"
                formType="email"
                patternErrorMessage="Enter a valid email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <TextInput
                inputLabel="username"
                formType="text"
                placeholder="Enter your username"
                patternErrorMessage="Username can only contain letters, numbers, and underscores, and must start and end with a letter or number."
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                errors={errors}
            />
            <TextInput
                inputLabel="password"
                placeholder="8 or more characters"
                emptyErrorMessage="Password is empty"
                formType={showPassword ? "text" : "password"}
                minLength={8}
                autoComplete="new-password"
                minLengthErrorMessage={
                    "Password must include at least 8 characters"
                }
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                errors={errors}
            >
            </TextInput>

            <div>
                <CustomButton
                    color="primary"
                    type="submit"
                    name="Create Account"
                    disabled={isLoading}
                    overrideStyle={"block w-full"}
                >
                    {isLoading ? <span>{"Loading ..."}</span> : <span>{"Start"}</span>}
                </CustomButton>
            </div>
        </form>
    )
}

export default Login
