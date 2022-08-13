import React from "react";
import axios from "axios";
const useCreatePlace = () => {
  const createPlace = async (PlaceData: object) => {
    console.log(PlaceData);
    const res = await axios({
      method: "post",
      url: "http://tripper.dentatic.com/api/admin/places/create",
      data: PlaceData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("bearerToken")!
        )}`,
      },
    });
    console.log(res);
  };
  return createPlace;
};

export default useCreatePlace;
