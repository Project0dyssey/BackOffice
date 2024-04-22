import { toast } from "react-toastify"

export function notifyToast(msg: string, type: boolean) {
    return type ? toast.success(msg) : toast.error(msg)
}