"use client";

import React, { useContext, createContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalContextProps {
    children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalContextProps) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <ModalContext.Provider  
            value={{ isModalOpen, setModalOpen }}
        >
            {children}
        </ModalContext.Provider>
    );
} 

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within a ModalProvider");
    return context;
}