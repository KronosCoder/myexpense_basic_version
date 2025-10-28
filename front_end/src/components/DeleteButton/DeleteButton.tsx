'use client';

import { useState } from 'react';
import { useTransactions } from "@/contexts/TransactionContext";
import { Trash2Icon } from "lucide-react";
import CustomModal from "../CustomModal/CustomModal"; 

interface Props {
    rowID: string;
}

export default function DeleteButton({ rowID }: Props) {
    const { deleteTransaction } = useTransactions();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTransaction(rowID);
        } catch (error) {
            console.error("ลบไม่สำเร็จ:", error);
        }
    };

    return (
        <>
            <button
                className="cursor-pointer px-3 py-1.5 bg-rose-100 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-200 transition-colors flex items-center gap-1"
                onClick={() => setIsModalOpen(true)} 
            >
                <Trash2Icon size={18} />
                <span className="hidden sm:inline">ลบ</span>
            </button>

            <CustomModal
                onOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="error"
                title="ยืนยันการลบ"
                text="คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การกระทำนี้ไม่สามารถย้อนกลับได้"
                cancelText="ยกเลิก"
                confirmText="ลบเลย"
                onConfirm={handleDelete}  
            />
        </>
    );
}