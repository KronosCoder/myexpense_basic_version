'use client';

import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { useRef } from 'react';
import { categories } from '@/utils/data/categories';
import { Toast } from "primereact/toast";
import { ChevronDown } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormErrors = Record<string, string>;

export default function TransactionEditModal({ isOpen, onClose }: TransactionModalProps) {
  const toastModal = useRef<Toast | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const newErrors: FormErrors = {}; 
  
  const validateForm = () => {
    if (!formData.type) newErrors.type = 'เลือกประเภทก่อนนะ~';
    if (!formData.category) newErrors.category = 'โปรดเลือกหมวดหมู่~'; 
    if (!formData.amount) newErrors.amount = 'โปรดใส่จำนวนเงิน~'; 
    if (!formData.date) newErrors.date = 'โปรดเลือกวันที่ก่อน~'; 
    if (!formData.description) newErrors.description = 'โปรดใส่รายละเอียด~'; 
    if (Object.entries(newErrors).length > 0) {
      toastModal.current?.show({
        severity: "warn",
        summary: "แจ้งเตือน!",
        detail: Object.entries(newErrors)[0][1],
        life: 2500,
      });
    }

    return Object.entries(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const addedMessage = 'เพิ่มข้อมูลสำเร็จ~';

    addTransaction({
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date
    });

    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });

    // console.log(formData)
    toastModal.current?.show({
      severity: 'success',
      summary: 'แจ้งเตือน',
      detail: addedMessage,
    })
    onClose();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      onClose(); 
    }
  }

  return (
    <>
      <Toast ref={toastModal}  position="top-center"/>
      <div 
        className={`${isOpen ? 'pointer-events-auto z-[1] scale-100' : 'pointer-events-none opacity-0 z-[-1]'} fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all ease-in-out duration-300`}
        onMouseDown={handleClick}  
      >
        <div 
          className={`${isOpen ? 'pointer-events-auto opacity-100 scale-100 z-[2]' : 'pointer-none: scale-90 z-[-1] opacity-0'} bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transition-pop`}
          ref={cardRef}
        >
          {/* Modal Header */}
          <div className={`sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-500 p-5 sm:p-6 flex justify-between items-center`}>
            <h3 className="text-xl sm:text-2xl font-bold text-white">เพิ่มรายการใหม่</h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6">
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ประเภท
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                    className={`py-3 px-4 rounded-xl font-medium transition-all cursor-pointer ${
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
                    className={`py-3 px-4 rounded-xl font-medium transition-all cursor-pointer ${
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

              <div className='relative'>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  หมวดหมู่
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-gray-700 !appearance-none"
                  required
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <span className='absolute top-11 right-4 text-slate-500'>
                  <ChevronDown size={20} strokeWidth={3}/>
                </span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  จำนวนเงิน
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    ฿
                  </span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  วันที่
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  รายละเอียด
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                  placeholder="กรอกรายละเอียด..."
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer flex-1 px-5 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSubmit}
                className="cursor-pointer flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}