import React, { MouseEvent, ReactNode } from "react";

interface CustomButtonProps {
    color: "primary" | "secondary" | "default" | "danger";
    disabled?: boolean;
    routeTo?: string;
    action?: () => void;
    children: ReactNode;
    overrideStyle?: string;
    type?: "button" | "submit" | "reset";
    [key: string]: any; // For additional props
}

const colors = {
    primary: "btn-brand bg-brand-blue text-white ",
    secondary: "btn-brand border border-brand-blue text-brand-blue",
    default: "btn-brand text-grey/50 border",
    danger: "btn-brand text-white bg-brand-red"
};

const CustomButton: React.FC<CustomButtonProps> = ({
    color,
    disabled = false,
    routeTo,
    action,
    children,
    overrideStyle,
    type = "button",
    ...otherProps
}) => {
    const handleButtonClick = (e: any) => {
        if (type !== "submit") {
            e.preventDefault();
        } action ? action() : null;
    };
    const selectedColor = colors[color];
    return (
        <button
            onClick={handleButtonClick}
            disabled={disabled}
            className={`${selectedColor} ${overrideStyle ? overrideStyle : ""}`}
            {...otherProps}
        >
            {routeTo ? (
                <a href={routeTo}>
                    {children}
                </a>
            ) : (
                children
            )}
        </button>
    )
}

export default CustomButton
