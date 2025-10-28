"use client";

import React, { useState } from 'react';
import SummaryCards from '@/components/SummaryCards/SummaryCards';
import MonthSelector from '@/components/MonthSelector/MonthSelector';
import TransactionTable from '@/components/TransactionTable/TransactionTable';
import TransactionAddModal from '@/components/Transaction/TransactionAddModal';
import { Plus } from 'lucide-react';
import TransactionPagination from '../TransactionTable/pagination/TransactionPagination';
import { useTransactions } from '@/contexts/TransactionContext';
import { useModal } from '@/contexts/ModalContext';
import CustomModal from '../CustomModal/CustomModal';

export default function HomeContent() {
    const { isModalOpen, setModalOpen } = useModal();
    const [currPage, setCurrPage] = useState(1);
    const { filteredTransactions } = useTransactions();
    const itemsPerPage = 4;
    const totalPage = Math.ceil(filteredTransactions.length / itemsPerPage);
    
    const onNext = () => {
        if (filteredTransactions && currPage < totalPage) setCurrPage((prev) =>  prev + 1)
        console.log('Click: ', currPage)
    } 
    const onPrevious = () => {
        if (filteredTransactions && currPage > 1) setCurrPage((prev) =>  prev - 1)
        console.log('Click: ', currPage)
    } 
    
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-0">
                            MyExpense
                        </h1>
                        <p className="text-slate-600 text-sm sm:text-base">
                            จัดการการเงินของคุณอย่างมีประสิทธิภาพ
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <SummaryCards />

                    {/* Main Content */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                            <MonthSelector />
                            
                            <button
                                onMouseDown={() => setModalOpen(true)}
                                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-400 text-white rounded-lg font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base cursor-pointer"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                เพิ่มรายการ
                            </button>
                        </div>
                        </div>

                        {/* Transaction Table */}
                        <TransactionTable currPage={currPage} itemsPerPage={itemsPerPage} />
                    </div>

                    <TransactionPagination currPage={currPage} onNext={onNext} onPrevious={onPrevious} />
                </div>

                {/* Modal */}
                <TransactionAddModal 
                    isOpen={isModalOpen} 
                    onClose={() => setModalOpen(false)} 
                />
            </div>
        </div>
    )
}
