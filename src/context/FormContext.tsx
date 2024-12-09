import React, { createContext, useContext, useState } from "react";

interface FormState {
    education: {
        degree: string;
        institution: string;
        yearOfGraduation: string;
    };
    career: {
        jobTitle: string;
        company: string;
        yearsOfExperience: string;
    };
}

const defaultFormState: FormState = {
    education: {
        degree: '',
        institution: '',
        yearOfGraduation: '',
    },
    career: {
        jobTitle: '',
        company: '',
        yearsOfExperience: '',
    },
};

interface FormContextType {
    username: string;
    setUsername: (username: string) => void;
    formState: FormState;
    updateFormState: <T extends keyof FormState>(
        section: T,
        values: Partial<FormState[T]>
    ) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>("");

    const [formState, setFormState] = useState<FormState>(defaultFormState);

    const updateFormState = <T extends keyof FormState>(
        section: T,
        values: Partial<FormState[T]>
    ) => {
        setFormState((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...values,
            },
        }));
    };

    return (
        <FormContext.Provider value={{ username, setUsername, formState, updateFormState }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};
