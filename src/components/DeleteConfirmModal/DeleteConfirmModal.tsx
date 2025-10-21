"use client";

import { useTransactions } from "@/contexts/TransactionContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/react";
import { AlertTriangle } from "lucide-react"; 

interface Props {
    rowID: string;
}

export default function DeleteConfirmModal({ rowID }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { deleteTransaction } = useTransactions();

  const handleDelete = (id: string) => {
    const isSuccess: boolean = deleteTransaction(id);
    if (!isSuccess) {
      return alert('Invalid ID')
    }

    onClose();
  }

  return (
    <>
      {/* Delete Button */}
        <button
            onClick={onOpen}
            className="!cursor-pointer px-3 py-1.5 bg-rose-100 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-200 transition-colors"
        >
            ลบ
        </button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
        className="p-4 text-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col items-center justify-center gap-3 py-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold mt-2">แน่ใจหรือว่าต้องการลบ?</h3>
                <p className="text-gray-500 text-sm">
                  ข้อมูลนี้จะไม่สามารถกู้คืนได้หลังจากลบแล้ว
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center gap-4 pb-6">
                <Button variant="light" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button color="danger" onPress={() => handleDelete(rowID)}>
                  ยืนยันการลบ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
