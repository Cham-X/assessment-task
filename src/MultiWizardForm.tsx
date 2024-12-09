import React, { useState } from 'react';
import { useFormContext } from './context/FormContext';
import EducationForm from './EducationForm';
import CareerForm from './CareerForm';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const { formState, username } = useFormContext();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmit = () => {
    console.log('Form Submitted', formState);
  };

  return (
    <div className="multi-step-form max-w-lg mx-auto p-6">
      <h1>hello {username}</h1>
      {step === 1 && <EducationForm onNext={handleNext} />}
      {step === 2 && <CareerForm onBack={handleBack} onSubmit={handleSubmit} />}
    </div>
  );
};

export default MultiStepForm;
