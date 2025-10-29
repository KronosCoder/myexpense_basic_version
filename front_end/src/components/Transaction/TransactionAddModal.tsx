'use client';

import React, { useState, useRef } from 'react';
import { X, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { categories } from '@/utils/data/categories';
import { Toast } from 'primereact/toast';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionAddModal({ isOpen, onClose }: TransactionModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addTransaction } = useTransactions();
  const toast = (globalThis as any).toastModal as React.RefObject<Toast>

  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const resetForm = () => {
    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.type) errors.type = 'เลือกประเภทก่อนนะ~';
    if (!formData.category) errors.category = 'โปรดเลือกหมวดหมู่~';
    if (!formData.amount || isNaN(+formData.amount)) errors.amount = 'โปรดใส่จำนวนเงิน~';
    if (!formData.date) errors.date = 'โปรดเลือกวันที่ก่อน~';
    if (!formData.description) errors.description = 'โปรดใส่รายละเอียด~';

    if (Object.keys(errors).length > 0) {
      toast.current?.show({
        severity: 'warn',
        summary: 'แจ้งเตือน!',
        detail: Object.values(errors)[0],
        life: 2500,
      });
      return false;
    }
    return true;
  };  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    addTransaction({
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
    });

    toast.current?.show({
      severity: 'success',
      summary: 'สำเร็จ',
      detail: 'เพิ่มข้อมูลสำเร็จ~',
      life: 2000,
    });

    setTimeout(() => {
      onClose();
      resetForm();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <>
      <Toast ref={toast} position="top-center" />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleBackdropClick}
      >
        {/* Modal Card */}
        <div
          ref={cardRef}
          onClick={(e) => e.stopPropagation()} // สำคัญ: ป้องกันการปิดเมื่อคลิกใน modal
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transition-all duration-300 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-500 p-5 sm:p-6 flex justify-between items-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white">เพิ่มรายการใหม่</h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">ประเภท</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.type === 'expense'
                      ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-500'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <TrendingDown className="w-5 h-5 mx-auto mb-1" />
                  รายจ่าย
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.type === 'income'
                      ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                  รายรับ
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">หมวดหมู่</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-700 appearance-none"
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories[formData.type].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute top-11 right-4 text-slate-500 pointer-events-none" size={20} />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">จำนวนเงิน</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">฿</span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="0.00"
                  step="0.01"

                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">วันที่</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">รายละเอียด</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                placeholder="กรอกรายละเอียด..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}