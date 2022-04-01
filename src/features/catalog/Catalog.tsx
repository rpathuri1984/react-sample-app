import * as React from "react";
import { useGetCatalogByNameQuery } from "./catalogAPI";

interface CatalogProps {}

const Catalog: React.FC<CatalogProps> = () => {
  const { data, error, isLoading } = useGetCatalogByNameQuery("bulbasaur");

  return (
    <>
      {error && <>Oh No! something went wrong</>}
      {isLoading && <>Loading...!</>}
      {data && <>Catlog Name : {data.name}</>}
    </>
  );
};

export default Catalog;
