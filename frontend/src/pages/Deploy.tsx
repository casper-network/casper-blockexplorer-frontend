import React, { useState, useEffect } from "react";
import useAsyncEffect from "use-async-effect";
import { useParams } from "react-router-dom";

import rpcClient, { getDeploy } from "../client";

const Deploy = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null);

  useAsyncEffect(async () => {
    if (params.id) {
      const fetchedData = await getDeploy(params.id);

      setData(fetchedData);
    }
  }, [params.id]);

  return (
    <div>
      <h2>Deploy</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Deploy;
