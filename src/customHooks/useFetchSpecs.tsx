import React from "react";
import axios from "axios";
import specsType from "../sharedType/specsType";
const useFetchSpecs = () => {
  const [specs, setspecs] = React.useState<specsType[]>([]);

  const fetchSpecs = async (place_type_id: string) => {
    const res = await axios({
      method: "get",
      url: `http://www.tripper.dentatic.com/api/specs?filter[place_type_id]=${place_type_id}`,
      headers: {
        Accept: "application/json",
      },
    });
    setspecs(res.data.data as specsType[]);
  };

  return [specs, fetchSpecs] as const;
};

export default useFetchSpecs;
