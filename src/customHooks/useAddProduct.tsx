import React from "react";
import axios from "axios";
const useAddProduct = () => {
  const addProduct = async (productData: object, placeId: string) => {
    const res = await axios({
      method: "post",
      url: `http://tripper.dentatic.com/api/admin/places/${placeId}/add-product`,
      data: productData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("bearerToken")!
        )}`,
      },
    });
    console.log(res);
  };
  return addProduct;
};

export default useAddProduct;
