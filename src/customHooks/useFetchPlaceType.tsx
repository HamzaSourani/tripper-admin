import React from "react";
import axios from "axios";
import placeType from "../sharedType/placeType";
const useFetchPlaceType = () => {
  const [placeType, setplaceType] = React.useState<placeType[]>([]);
  React.useEffect(() => {
    (async () => {
      const res = await axios({
        method: "get",
        url: "http://tripper.dentatic.com/api/place-types",
        headers: {
          Accept: "application/json",
        },
      });
      setplaceType(res.data.data as placeType[]);
    })();
  }, []);

  return placeType;
};

export default useFetchPlaceType;
