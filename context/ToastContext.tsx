import React, { createContext, ReactNode, useContext, useState } from 'react';
import Toast, { ToastIconType } from '../components/Toast';

interface ToastContextType {
    showToast: (message: string, duration?: number, icon?: {
        type: ToastIconType;
        name?: string;
        source?: any;
        size?: number;
        color?: string;
    }) => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<{
        message: string;
        visible: boolean;
        duration?: number;
        icon?: {
            type: ToastIconType;
            name?: string;
            source?: any;
            size?: number;
            color?: string;
        };
    }>({
        message: '',
        visible: false,
        duration: 3000,
    });

    const showToast = (message: string, duration: number = 3000, icon?: {
        type: ToastIconType;
        name?: string;
        source?: any;
        size?: number;
        color?: string;
    }) => {
        setToast({
            message,
            visible: true,
            duration,
            icon,
        });
    };

    const hideToast = () => {
        setToast(prev => ({
            ...prev,
            visible: false,
        }));
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Toast
                message={toast.message}
                visible={toast.visible}
                onHide={hideToast}
                duration={toast.duration}
                icon={toast.icon}
            />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
