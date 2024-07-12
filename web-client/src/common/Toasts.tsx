import useToast from "../hooks/useToast";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { Toast } from "../types";


export default function Toasts() {
  const toast = useToast();

  return (
    <article className="pointer-events-none fixed left-0 top-0 z-[999] flex h-full w-full flex-col">
      <figure role="separator" className="flex-1" />

      <section className="flex flex-col items-center">
        {toast.list.map((item, key) => (
          <ToastView toast={item} key={key} />
        ))}
      </section>
    </article>
  );
}

function ToastView(props: { toast: Toast }) {
  const toast = useToast();
  const item = props.toast;

  return (
    <div
      className={twMerge(
        "pointer-events-auto relative z-[999] mb-3 flex min-w-[40vw] max-w-[70vw] items-center rounded-md p-5 text-white",
        item.type == "success" && "bg-green-500",
        item.type == "info" && "bg-blue-500",
        item.type == "warning" && "bg-yellow-500",
        item.type == "error" && "bg-red-500"
      )}
    >
      <div
        className="absolute left-0 top-0 h-1 border-b border-b-black bg-white bg-opacity-80 shadow-md"
        style={{
          animation: `keyframes--w-full-to-none linear ${item.timeout}ms`,
        }}
      />

      <div className="drop-shadow-mdcol flex flex-1 flex-col">
        <h1 className="font-cabin text-lg font-medium">{item.title}</h1>
        <p className="text-sm">{item.description}</p>
      </div>

      {item.action && (
        <div className="pl-8">
          <button
            onClick={() => {
              item.action?.callback();
              if (item.action?.removeOnAction) {
                toast.remove(item.id);
              }
            }}
            className="rounded-md border border-transparent bg-black bg-opacity-20 px-4 py-2 drop-shadow-md duration-300 hover:border-black hover:border-opacity-30 hover:bg-white hover:bg-opacity-10"
          >
            {item.action.title}
          </button>
        </div>
      )}

      <button className="ml-4 text-xl" onClick={() => toast.remove(item.id)}>
        <Icon icon="close" />
      </button>
    </div>
  );
}
