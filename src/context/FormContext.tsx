// src/context/FormContext.tsx
import React, { createContext, useContext, useState } from "react";

type FormContextType = {
    username: string;
    setUsername: (username: string) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>("");

    return (
        <FormContext.Provider value={{ username, setUsername }}>
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
