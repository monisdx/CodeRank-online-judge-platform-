import useGlobalContext from "../contexts/globalContext";
import { Toast } from "../types";
import { generateRandomString } from "../utils";

type ToastInput = Omit<Toast, "createdAt" | "type" | "timeout" | "id"> &
  Partial<{
    timeout: number;
  }>;

const defaultTimeout = 5000;

export default function useToast() {
  const global = useGlobalContext();

  function addToast(toast: ToastInput & { type: Toast["type"] }) {
    const uuid = generateRandomString(8, Date.now().toString());

    setTimeout(() => {
      remove(uuid);
    }, toast.timeout || defaultTimeout);

    global.toastsState.setToasts((p) => [
      ...p,
      {
        id: uuid,
        ...toast,
        createdAt: Date.now(),
        timeout: toast.timeout || defaultTimeout,
      },
    ]);
  }

  function display(toast: ToastInput) {
    addToast({ ...toast, type: "success" });
  }
  function error(toast: ToastInput) {
    addToast({ ...toast, type: "error" });
  }
  function log(toast: ToastInput) {
    addToast({ ...toast, type: "info" });
  }
  function warn(toast: ToastInput) {
    addToast({ ...toast, type: "warning" });
  }

  function clear() {
    global.toastsState.setToasts([]);
  }

  function remove(id: string) {
    global.toastsState.setToasts((p) => p.filter((t) => t.id !== id));
  }

  return {
    display,
    error,
    log,
    warn,
    clear,
    remove,
    list: global.toastsState.toasts,
  };
}
