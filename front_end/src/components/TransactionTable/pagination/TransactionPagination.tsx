import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TransactionPaginationProps {
    currPage: number;
    onNext: () => void;
    onPrevious: () => void;
} 

export default function TransactionPagination ({ currPage, onNext, onPrevious }: TransactionPaginationProps) {
    return (
        <div>
            <section className="flex justify-center items-center mt-4 gap-10">
                <span 
                    className='w-[40px] aspect-square rounded-full text-black flex items-center justify-center bg-white shadow-md cursor-pointer'
                    onMouseDown={onPrevious}
                >
                    <ChevronLeft />
                </span>
                <span 
                    className='w-[40px] aspect-square rounded-full text-black flex items-center justify-center bg-white shadow-md cursor-pointer'
                    onMouseDown={onNext}
                >
                    <ChevronRight />
                </span>
            </section>
        </div>
    )
}
