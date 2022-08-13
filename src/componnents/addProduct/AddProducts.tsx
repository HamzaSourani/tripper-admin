import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import InputText from "../../sharedComponents/InputText";
import InputNumber from "../../sharedComponents/InputNumber";
import useFetchProductType from "../../customHooks/useFetchProductType";
import useAddProduct from "../../customHooks/useAddProduct";
const AddProducts = () => {
  const [placeId, setplaceId] = useState<string>(
    "96e97f67-cb6d-4ee4-b9bd-63395c18a976"
  );
  const [placeType, setplaceType] = useState<string>(
    "96e97f67-bc4d-41c9-b7c3-85edc979bdce"
  );
  const [typeId, settypeId] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [price, setprice] = useState<number>(0);
  const [img, setimg] = useState<File>();
  const [productTypes, fetchProductType] = useFetchProductType();
  const formEle = React.useRef<HTMLFormElement>(null!);
  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    else {
      const file = e.target.files[0];
      setimg(file);
    }
  };
  const canCreateProduct = [typeId, name, placeId].every(Boolean);
  const addProduct = useAddProduct();
  const addProductHandler = () => {
    const formData = new FormData();
    formData.append("products[0][type_id]", typeId);
    formData.append("products[0][name]", name);
    formData.append("products[0][img]", img!);
    formData.append("products[0][price]", String(price));
    // const productData = {
    //   products: [
    //     {
    //       type_id: typeId,
    //       name,
    //       img,
    //       price,
    //     },
    //   ],
    // };
    // console.log(productData);
    addProduct(formData, placeId);
  };
  return (
    <Box sx={{ mr: "240px", ml: 5, mt: 5, mb: 10 }}>
      <Grid container spacing={3}>
        <Grid
          item
          container
          alignItems={"center"}
          xs={12}
          sx={{ backgroundColor: "#e9f2fb", borderRadius: "1rem" }}
        >
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              معرف المكان
            </Typography>
            <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
              <InputText
                label="معرف المكان"
                value={placeId}
                setValue={setplaceId}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              نوع المكان
            </Typography>
            <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
              <InputText
                label="نوع المكان"
                value={placeType}
                setValue={setplaceType}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ backgroundColor: "var(--primary-color)" }} />
            <Button
              sx={{ my: 2 }}
              variant="contained"
              onClick={() => fetchProductType(placeType)}
            >
              تأكيد
            </Button>
          </Grid>
        </Grid>
        <Grid item container alignItems={"center"} xs={12}>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              اسم المنتج
            </Typography>
            <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
              <InputText label="اسم المنتج" value={name} setValue={setname} />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              سعر المنتج
            </Typography>
            <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
              <InputNumber label="السعر" value={price} setValue={setprice} />
            </Stack>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "#e9f2fb", borderRadius: "1rem" }}
        >
          <Typography
            sx={{
              fontSize: { xs: "25px" },
              fontWeight: { sx: "defualt", md: "700" },
            }}
          >
            نوع المكان
          </Typography>
          <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
            {productTypes.map((productType, index) => {
              return (
                <Button
                  key={productType.id}
                  variant={typeId === productType.id ? "contained" : "text"}
                  sx={{ boxShadow: 2 }}
                  onClick={() => settypeId(productType.id)}
                >
                  {productType.name}
                </Button>
              );
            })}
          </Stack>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              اختيار صورة للمنتج
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack sx={{ my: 2 }} spacing={2}>
              <input
                accept="image/png"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={handleImgUpload}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  اختر صورة
                </Button>
              </label>
            </Stack>
          </Grid>
        </Grid>
        {canCreateProduct && (
          <Grid item xs={12}>
            <Stack justifyContent={"center"} direction="row">
              <Button
                type="submit"
                variant="contained"
                onClick={addProductHandler}
              >
                {" "}
                إضافة منتج
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AddProducts;
