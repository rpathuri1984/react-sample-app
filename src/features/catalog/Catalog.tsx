import { skipToken } from "@reduxjs/toolkit/dist/query";
import * as React from "react";
import {
  useGetCatalogByNameQuery,
  useLazyGetCatalogByNameQuery,
} from "./catalogAPI";

interface CatalogProps {}

const Catalog: React.FC<CatalogProps> = () => {
  const [postId, setPostId] = React.useState<any>(skipToken);

  const result = useGetCatalogByNameQuery(postId);
  if (result.error) {
    return <>Oh No! something went wrong</>;
  }

  if (result.isLoading) {
    return <>Loading..!</>;
  }

  return (
    <>
      Catlog Name : {result.data?.title}
      <button
        onClick={() => {
          setPostId(1);
        }}
      >
        get data
      </button>
    </>
  );
};

export default Catalog;
