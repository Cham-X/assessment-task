import React, { useState } from "react";
import Login from "./Login"; // Import the Login component (Step 1)
import StepTwo from "./StepTwo"; // Import Step 2 component
import StepThree from "./StepThree"; // Import Step 3 component

const MultiStepForm = () => {
  // State to keep track of the current step
  const [currentStep, setCurrentStep] = useState(1);

  // State to store the cumulative form data
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    age: "", // Add more fields as needed for other steps
  });

  // Function to handle progressing to the next step
  const handleNext = (stepData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...stepData })); // Merge step data with existing data
    setCurrentStep((prev) => prev + 1); // Move to the next step
  };

  // Function to handle going back to the previous step
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="form-wizard max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Step {currentStep}</h1>
      {currentStep === 1 && (
        <Login
          onNext={(loginData) => handleNext(loginData)} // Pass data from Login step to parent
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          formData={formData} // Pass collected data to Step 2
          onNext={(stepTwoData) => handleNext(stepTwoData)} // Collect Step 2 data and move to next step
          onBack={handleBack} // Allow user to go back to Step 1
        />
      )}
      {currentStep === 3 && (
        <StepThree
          formData={formData} // Pass cumulative data to Step 3
          onSubmit={() => alert("Form Submitted!")} // Handle final submission
          onBack={handleBack} // Allow user to go back to Step 2
        />
      )}
    </div>
  );
};

export default MultiStepForm;
