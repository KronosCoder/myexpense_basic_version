import Swal from "sweetalert2";

export const swalCustom = Swal.mixin({
    customClass: {
        confirmButton: "bg-blue-200 text-blue-500 px-4 py-1 rounded-md cursor-pointer transition-colorshover:bg-blue-300",
        cancelButton: "bg-red-200 text-red-500 px-4 py-1 rounded-md cursor-pointer transition-colorshover:bg-red-300",
        actions: 'gap-3',
    },
    buttonsStyling: false,
})