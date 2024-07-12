import React, { createContext, useContext, useState } from "react";
import { Toast } from "../types";

interface GlobalContextType {
  modalState: {
    modal: React.ReactNode;
    setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  };

  toastsState: {
    toasts: Toast[];
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
  };

  refreshState: {
    seeds: Record<string, number>;
    setSeeds: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  };
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modal, setModal] = useState<React.ReactNode | null>();
  const [toasts, setToasts] = useState<Array<Toast>>([]);
  const [refreshSeeds, setRefreshSeeds] = useState<Record<string, number>>({});

  const value: GlobalContextType = {
    modalState: { modal, setModal },
    toastsState: { toasts, setToasts },
    refreshState: { seeds: refreshSeeds, setSeeds: setRefreshSeeds },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
