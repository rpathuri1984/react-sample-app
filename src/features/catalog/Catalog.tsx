import * as React from "react";
import { useLazyGetCatalogByNameQuery } from "./catalogAPI";

interface CatalogProps {}

const Catalog: React.FC<CatalogProps> = () => {
  const [getPokeman, result] = useLazyGetCatalogByNameQuery();
  return (
    <>
      {result.error && <>Oh No! something went wrong</>}
      {result.isLoading && <>Loading...!</>}
      {result.isFetching && <>Fetching...!</>}
      {result.data && <>Catlog Name : {result.data.reason}</>}

      <button onClick={() => getPokeman("bulbasaur", false)}>get data</button>
    </>
  );
};

export default Catalog;
