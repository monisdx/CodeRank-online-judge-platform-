import useGlobalContext from "../contexts/globalContext";

export default function useRefreshComponent() {
  const { refreshState } = useGlobalContext();

  function byId(id: RefrashableComponentId) {
    refreshState.setSeeds((p) => ({ ...p, [id]: Math.random() }));
  }

  return { byId };
}

export type RefrashableComponentId = "page" | "homepagePreviewItems";
