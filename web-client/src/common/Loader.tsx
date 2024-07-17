import React from "react";
import { twMerge } from "tailwind-merge";

export default function Loader(props: { className?: string }) {
  return (
    <figure
      className={twMerge(
        "aspect-square relative z-0",
        "before:absolute before:left-1/2 before:top-0 before:h-full before:w-1/5 before:-translate-x-1/2",
        "after:absolute after:left-0 after:top-1/2 after:h-1/5 after:w-full after:-translate-y-1/2",
        props.className
      )}
    >
      <img src="/images/loader.svg" alt="loader" className="w-full h-full" />
    </figure>
  );
}
