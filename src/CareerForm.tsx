import React, { useState } from 'react';
import { useFormContext } from './context/FormContext';
import TextInput from './components/form/TextInput';
import Modal from './components/Modal';
import CustomButton from './components/custom-button/CustomButton';

const CareerForm: React.FC<{ onBack: () => void; onSubmit: () => void }> = ({ onBack, onSubmit }) => {
  const { formState, updateFormState, username } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    updateFormState("career", { [name]: value });
  }

  const handleSubmit = () => {
    setIsModalOpen(true); // Show the modal on submit
    console.log(formState)
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

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
      <div className="btn-div w-full">
        <CustomButton color="default" onClick={onBack}>
          Back
        </CustomButton>
        <CustomButton color="primary" onClick={handleSubmit}>
          Submit
        </CustomButton>
      </div>

      {/* Modal to display user info */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="text-lg font-bold mb-4">User Information</h3>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Degree:</strong> {formState.education?.degree || "N/A"}
          </p>
          <p>
            <strong>Institution:</strong> {formState.education?.institution || "N/A"}
          </p>
          <p>
            <strong>Year of Graduation:</strong>{" "}
            {formState.education?.yearOfGraduation || "N/A"}
          </p>
          <p>
            <strong>Job Title:</strong> {formState.career?.jobTitle || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {formState.career?.company || "N/A"}
          </p>
          <p>
            <strong>Years of Experience:</strong>{" "}
            {formState.career?.yearsOfExperience || "N/A"}
          </p>
          <div className='btn-right'>
            <CustomButton color="primary" onClick={closeModal}>
              Close
            </CustomButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CareerForm;
