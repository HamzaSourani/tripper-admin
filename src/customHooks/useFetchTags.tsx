import React from "react";
import axios from "axios";
import tagsType from "../sharedType/tagsType";
const useFetchTags = () => {
  const [tags, settags] = React.useState<tagsType[]>([]);
  React.useEffect(() => {
    (async () => {
      const res = await axios({
        method: "get",
        url: "http://www.tripper.dentatic.com/api/tags",
        headers: {
          Accept: "application/json",
        },
      });
      settags(res.data.data as tagsType[]);
    })();
  }, []);
  return tags;
};

export default useFetchTags;
