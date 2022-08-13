import React from "react";
import axios from "axios";
type resType = {
  id: string;
  place_type_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}[];
const useFetchProductType = () => {
  const [productType, setProductType] = React.useState<resType>([]);
  const fetchProductType = async (place_type: string) => {
    const res = await axios({
      method: "get",
      url: `http://www.tripper.dentatic.com/api/product-types/${place_type}`,
      headers: {
        Accept: "application/json",
      },
    });
    setProductType(res.data.data as resType);
  };

  return [productType, fetchProductType] as const;
};

export default useFetchProductType;
