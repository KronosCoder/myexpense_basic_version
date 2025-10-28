'use client';

import React from 'react';
import { TriangleAlert, CheckCircle, XCircle, Info } from 'lucide-react';

interface CustomModalProps {
  onOpen: boolean;
  onClose: () => void;
  type: 'success' | 'warning' | 'error' | 'information';
  title: string;
  text?: string;
  hasCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

export default function CustomModal({
  onOpen,
  onClose,
  type,
  title = 'แจ้งเตือน',
  text = 'ข้อมูลที่คุณลบจะหายไป',
  hasCancel = true,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
}: CustomModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const config = {
    success: {
      icon: <CheckCircle size={42} strokeWidth={2} />,
      color: 'text-green-400',
      bg: 'bg-green-100',
    },
    warning: {
      icon: <TriangleAlert size={42} strokeWidth={2} />,
      color: 'text-orange-400',
      bg: 'bg-orange-100',
    },
    error: {
      icon: <XCircle size={42} strokeWidth={2} />,
      color: 'text-red-400',
      bg: 'bg-red-100',
    },
    information: {
      icon: <Info size={42} strokeWidth={2} />,
      color: 'text-blue-400',
      bg: 'bg-blue-100',
    },
  };

  const { icon, color, bg } = config[type] || config.warning;

  return (
    <div
      className={`${onOpen ? 'opacity-100 pointer-events-auto z-50' : 'opacity-0 pointer-events-none z-[-1]'} fixed inset-0 bg-black/25 flex justify-center items-center transition-all duration-400 ease-in-out`}
      onClick={handleBackdropClick}
    >
      {/* Card */}
      <div
        className={`${onOpen ? 'opacity-100 pointer-events-auto scale-100 z-50' : 'opacity-0 pointer-events-none scale-90 z-[-1]'} bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transition-pop`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div
            className={`w-20 aspect-square ${bg} ${color} flex items-center justify-center rounded-full`}
          >
            {icon}
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Body */}
        {text && (
          <div className="text-center text-sm text-gray-600">
            <p>{text}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center mt-6">
          {hasCancel && (
            <button
              onMouseDown={onClose}
              className="px-5 py-2 rounded-lg font-medium text-red-400 bg-red-200 hover:bg-red-300 hover:text-red-500 transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            onMouseDown={onConfirm}
            className={`px-5 py-2 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}