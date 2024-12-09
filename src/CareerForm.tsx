import React from 'react';
import { useFormContext } from './context/FormContext';
import TextInput from './components/form/TextInput';
import CustomButton from './components/custom-button/CustomButton';

const CareerForm: React.FC<{ onBack: () => void; onSubmit: () => void }> = ({ onBack, onSubmit }) => {
  const { formState, updateFormState } = useFormContext();

  const handleInputChange = (name: string, value: string) => {
    updateFormState("career", { [name]: value });
  }

  return (
    <div className="career-form p-4">
      <h2 className="text-xl font-bold mb-4">Career Information</h2>
      <TextInput
        inputLabel="Job Title"
        name="jobTitle"
        placeholder="Enter your job title"
        value={formState.career.jobTitle}
        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
        errors={{}}
      />
      <TextInput
        inputLabel="Company"
        name="company"
        placeholder="Enter your company"
        value={formState.career.company}
        onChange={(e) => handleInputChange("company", e.target.value)}
        errors={{}}
      />
      <TextInput
        inputLabel="Years of Experience"
        name="yearsOfExperience"
        placeholder="Enter years of experience"
        value={formState.career.yearsOfExperience}
        onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
        errors={{}}
      />
      <div className="flex gap-4">
        <CustomButton color="default" onClick={onBack}>
          Back
        </CustomButton>
        <CustomButton color="primary" onClick={onSubmit}>
          Submit
        </CustomButton>
      </div>
    </div>
  );
};

export default CareerForm;
