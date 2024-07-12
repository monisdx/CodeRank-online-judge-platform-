import React from "react";

export interface Toast {
  title: string;
  id: string;
  description?: string;
  action?: {
    title: string;
    callback: () => void;
    removeOnAction?: boolean;
  };
  timeout: number;
  type: "success" | "warning" | "error" | "info";
  element?: React.ReactElement;
  createdAt: number;
}
