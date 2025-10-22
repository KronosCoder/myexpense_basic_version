import { useTransactions } from "@/contexts/TransactionContext";
import { swalCustom } from "../../utils/custom/sweetalert/SwalCustom";
import { Trash2Icon } from "lucide-react";
interface Props {
    rowID: string;
}

export default function DeleteButton({ rowID }: Props) {
  const { deleteTransaction } = useTransactions();

  const handleDelete = (id: string) => {

    swalCustom.fire({
      title: "คุณแน่ใจที่จะลบ?",
      text: "ข้อมูลนี้จะถูกลบถาวรนะ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบเลย",
      cancelButtonText: "ไม่ดีกว่า",
    }).then((result) => {
      if(result.isConfirmed) {
        const deletedRow= deleteTransaction(id);
        if (deletedRow) {
          swalCustom.fire({
            title: "ลบเรียบร้อย",
            text: "ข้อมูลบันทึกถูกลบแล้ว",
            icon: "success",
          })
        } else {
          swalCustom.fire({
            title: "พิดพลาด",
            text: "มีบางอย่างผิดพลาด",
            icon: "error",
          })
        }
      }
    });
  }

  return (
    <>
      {/* Delete Button */}
        <button
            onMouseDown={() => handleDelete(rowID)}
            onTouchEnd={() => handleDelete(rowID)}
            className="!cursor-pointer px-3 py-1.5 bg-rose-100 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-200 transition-colors"
        >
            <Trash2Icon size={20} />
        </button>
    </>
  );
}
