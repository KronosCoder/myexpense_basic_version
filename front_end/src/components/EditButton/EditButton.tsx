import { useState } from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { swalCustom } from "@/utils/custom/sweetalert/SwalCustom";
import TransactionEditModal from "../Transaction/TransactionEditModal";
import { SquarePen } from "lucide-react";
interface Props {
    rowID: string;
}

export default function EditButton({ rowID }: Props) {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const closeModal = () => setOpenModal(false);
  const openModal = () => setOpenModal(true);

  return (
    <>
      {/* Delete Button */}
        <button
            className="!cursor-pointer px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
            onMouseDown={openModal}
        >
            <SquarePen size={20} />
        </button>

        <TransactionEditModal isOpen={isOpenModal} onClose={closeModal} transactionID={rowID} />
    </>
  );
}
