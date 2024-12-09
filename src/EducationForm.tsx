import React from "react";
import { useFormContext } from "./context/FormContext";
import TextInput from "./components/form/TextInput";
import CustomButton from "./components/custom-button/CustomButton";

const EducationForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const { formState, updateFormState } = useFormContext();

    const handleInputChange = (name: string, value: string) => {
        updateFormState("education", { [name]: value });
    };

    return (
        <div className="education-form p-4">
            <h2 className="text-xl font-bold mb-4">Education Information</h2>
            <TextInput
                inputLabel="Degree"
                name="degree"
                placeholder="Enter your degree"
                value={formState.education.degree}
                onChange={(e) => handleInputChange("degree", e.target.value)}
                errors={{}}
            />
            <TextInput
                inputLabel="Institution"
                name="institution"
                placeholder="Enter your institution"
                value={formState.education.institution}
                onChange={(e) => handleInputChange("institution", e.target.value)}
                errors={{}}
            />
            <TextInput
                inputLabel="Year of Graduation"
                name="yearOfGraduation"
                placeholder="Enter year of graduation"
                value={formState.education.yearOfGraduation}
                onChange={(e) => handleInputChange("yearOfGraduation", e.target.value)}
                errors={{}}
            />
            <CustomButton color="primary" onClick={onNext}>
                Next
            </CustomButton>
        </div>
    );
};

export default EducationForm;
