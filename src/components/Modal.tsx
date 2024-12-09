import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import CustomButton from "./custom-button/CustomButton";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
            <div className="modal-content bg-white rounded-lg shadow-xl w-11/12 max-w-lg relative">
                <CustomButton color="default" onClick={onClose} overrideStyle="btn-right absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    ✕
                </CustomButton>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
