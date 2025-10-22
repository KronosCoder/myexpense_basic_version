import { useState } from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { swalCustom } from "@/utils/custom/sweetalert/SwalCustom";
import TransactionModal from "../Transaction/TransactionEditModal";
import { SquarePen } from "lucide-react";
interface Props {
    rowID: string;
}

export default function EditButton({ rowID }: Props) {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      {/* Delete Button */}
        <button
            className="!cursor-pointer px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
        >
            <SquarePen size={20} />
        </button>

        
    </>
  );
}
