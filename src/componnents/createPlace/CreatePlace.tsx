import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useFetchSpecs from "../../customHooks/useFetchSpecs";
import useFetchPlaceType from "../../customHooks/useFetchPlaceType";
import useFetchTags from "../../customHooks/useFetchTags";
import InputText from "../../sharedComponents/InputText";
import InputSelect from "./InputSelect";
import useCreatePlace from "../../customHooks/useCreatePlace";
type selectedSpecType = { id: string; option: string[] };
const CreatePlace = () => {
  const [section, setSection] = React.useState<string>("");
  const [placeName, setplaceName] = useState<string>("");
  const [address, setaddress] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [cityId, setCityId] = useState<string>("");
  const [tagsId, settagsId] = useState<string[]>([]);
  const [imgSrc, setImgSrc] = React.useState<File[]>([]);
  const [selectedSpecs, setselectedSpecs] = useState<selectedSpecType[]>([]);
  const placeTypes = useFetchPlaceType();
  const [specs, fetchSpecs] = useFetchSpecs();
  const tags = useFetchTags();
  const createPlace = useCreatePlace();
  console.log(JSON.parse(localStorage.getItem("bearerToken")!));
  console.log(section);
  const createPlaceHandler = () => {
    const formData = new FormData();
    selectedSpecs.forEach((spec, out) => {
      formData.append(`specs[${out}][id]`, spec.id);
      spec.option.forEach((option, inI) =>
        formData.append(`specs[${out}][option][${inI}]`, option)
      );
    });
    imgSrc.forEach((img) => formData.append("images[]", img));
    formData.append("name", placeName);
    formData.append("place_type_id", section);
    formData.append("description", description);
    formData.append("address[address]", address);
    formData.append("address[city_id]", cityId);
    tagsId.forEach((tag) => formData.append("tag[]", tag));

    createPlace(formData);
  };
  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    for (let i = 0; i < e.target.files?.length; i++) {
      const file = e.target.files[i];
      setImgSrc((imgSrc) => [...imgSrc, file]);
    }
  };
  const selectSpecsHandler = (value: string) => {
    let temp: selectedSpecType[] = [];

    if (selectedSpecs.find((item) => item.id === value)) {
      temp = selectedSpecs.filter((item) => item.id !== value);
      setselectedSpecs([...temp]);
    } else
      setselectedSpecs((selectedSpecs) => [
        { id: value, option: [] },
        ...selectedSpecs,
      ]);
  };
  const selectOptionhandler = (specId: string, optionId: string) => {
    let optionTemp: string[] = [];
    let specTemp: selectedSpecType | undefined;
    if (selectedSpecs.find((item) => item.option.includes(optionId))) {
      specTemp = selectedSpecs.find((item) => item.id === specId);
      optionTemp = specTemp?.option.filter((option) => option !== optionId)
        ? specTemp?.option.filter((option) => option !== optionId)
        : [];
      let final = selectedSpecs.map((selectedSpec) => {
        if (selectedSpec.id === specId) {
          selectedSpec.option = [...optionTemp];
          return selectedSpec;
        } else return selectedSpec;
      });
      setselectedSpecs([...final]);
    } else {
      specTemp = selectedSpecs.find((item) => item.id === specId);
      optionTemp = specTemp!.option;
      let final = selectedSpecs.map((selectedSpec) => {
        if (selectedSpec.id === specId) {
          selectedSpec.option = [...optionTemp, optionId];
          return selectedSpec;
        } else return selectedSpec;
      });
      setselectedSpecs([...final]);
    }
  };

  const selectTagHandler = (value: string) => {
    let temp: string[] = [];
    if (tagsId.includes(value)) {
      temp = tagsId.filter((i) => i !== value);
      settagsId([...temp]);
    } else settagsId((tagsId) => [value, ...tagsId]);
  };

  return (
    <Box sx={{ mr: "240px", ml: 5, mt: 5, mb: 10 }}>
      <Grid container spacing={3}>
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
            {placeTypes.map((_section, index) => {
              return (
                <Button
                  key={_section.id}
                  variant={section === _section.id ? "contained" : "text"}
                  sx={{ boxShadow: 2 }}
                  onClick={() => setSection(_section.id)}
                >
                  {_section.name}
                </Button>
              );
            })}
          </Stack>
          {section && (
            <>
              <Divider sx={{ backgroundColor: "var(--primary-color)" }} />
              <Button
                sx={{ my: 2 }}
                variant="contained"
                onClick={() => fetchSpecs(section)}
              >
                تأكيد
              </Button>
            </>
          )}
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              اسم المكان
            </Typography>
            <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
              <InputText
                label="اسم المكان"
                value={placeName}
                setValue={setplaceName}
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
              عنوان المكان
            </Typography>
            <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
              <InputText
                label="عنوان المكان"
                value={address}
                setValue={setaddress}
              />
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
            وصف المكان
          </Typography>
          <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
            <InputText
              label="وصف المكان"
              value={description}
              setValue={setdescription}
              mulitline={true}
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
            المدينة
          </Typography>
          <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
            <InputSelect label="المدينة" value={cityId} setValue={setCityId} />
          </Stack>
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
            خصائص المكان
          </Typography>
          <Stack sx={{ my: 2 }} direction={"row"} spacing={2}>
            {specs.map((spec, index) => {
              return (
                <Stack>
                  <Button
                    key={spec.id}
                    variant={
                      Boolean(
                        selectedSpecs.find(
                          (selectedSpec) => selectedSpec.id === spec.id
                        )
                      )
                        ? "contained"
                        : "text"
                    }
                    sx={{ boxShadow: 2 }}
                    onClick={() => selectSpecsHandler(spec.id)}
                  >
                    {spec.name}
                  </Button>
                  {Boolean(
                    selectedSpecs.find(
                      (selectedSpec) => selectedSpec.id === spec.id
                    )
                  ) && (
                    <List>
                      {spec.options.map((option) => {
                        return (
                          <ListItem
                            onClick={() =>
                              selectOptionhandler(spec.id, option.id)
                            }
                          >
                            <Button
                              variant={
                                Boolean(
                                  selectedSpecs
                                    .find(
                                      (selectedSpec) =>
                                        selectedSpec.id === spec.id
                                    )
                                    ?.option.includes(option.id)
                                )
                                  ? "outlined"
                                  : "text"
                              }
                            >
                              {option.name}
                            </Button>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </Stack>
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
              علامات المكان
            </Typography>
          </Grid>
          {tags.map((tag, index) => {
            return (
              <Grid item>
                <Button
                  key={tag.id}
                  variant={
                    Boolean(tagsId.find((_tag) => _tag === tag.name))
                      ? "contained"
                      : "text"
                  }
                  sx={{ boxShadow: 2 }}
                  onClick={() => selectTagHandler(tag.name)}
                >
                  {tag.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          sx={{
            backgroundColor: "#e9f2fb",
            borderRadius: "1rem",
            my: 5,
            ml: 3,
            pb: 5,
          }}
        >
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              اختيار صور للمكان
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack sx={{ my: 2 }} spacing={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                multiple
                onChange={handleImgUpload}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  اختر صورة او مجموعة من الصور
                </Button>
              </label>
            </Stack>
          </Grid>
          {imgSrc.map((src) => (
            <Grid item lg={4}>
              <Box
                sx={{
                  position: "relative",
                  pt: { xs: "75%" },
                  width: "100%",
                  boxShadow: 2,
                  borderRadius: ".5rem",
                }}
                onClick={() => setImgSrc(imgSrc.filter((_src) => _src !== src))}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "-webkit-fill-available",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderRadius: "inherit",
                  }}
                  component={"img"}
                  src={URL.createObjectURL(src)}
                ></Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Stack justifyContent={"center"} direction="row">
            <Button onClick={createPlaceHandler} variant="contained">
              {" "}
              إنشاء مكان
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePlace;
