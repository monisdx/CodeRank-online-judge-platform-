import React, { useState } from "react";
import { RefrashableComponentId } from "../hooks/useRefreshComponent";
import useGlobalContext from "../contexts/globalContext";

export default function RefreshBoundary(props: {
  children: React.ReactElement;
  id: RefrashableComponentId;
}) {
  const { refreshState } = useGlobalContext();

  return (
    <>
      {React.cloneElement(props.children, {
        key: refreshState.seeds[props.id],
      })}
    </>
  );
}
