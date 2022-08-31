import React, { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { useParams } from "react-router-dom";

import { getAccount } from "../client";

const Account = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null);

  useAsyncEffect(async () => {
    if (params.id) {
      const fetchedData = await getAccount(params.id);

      setData(fetchedData);
    }
  }, [params.id]);

  return (
    <div>
      <h2>Account</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Account;
