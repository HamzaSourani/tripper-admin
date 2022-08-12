import React from "react";
import axios from "axios";
import specsType from "../sharedType/specsType";
const useFetchSpecs = () => {
  const [specs, setspecs] = React.useState<specsType[]>([]);
  React.useEffect(() => {
    (async () => {
      const res = await axios({
        method: "get",
        url: "http://www.tripper.dentatic.com/api/specs",
        headers: {
          Accept: "application/json",
        },
      });
      setspecs(res.data.data as specsType[]);
    })();
  }, []);
  return [specs, setspecs] as const;
};

export default useFetchSpecs;
