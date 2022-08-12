import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import useFetchSpecs from "../../customHooks/useFetchSpecs";
import useFetchPlaceType from "../../customHooks/useFetchPlaceType";
import useFetchTags from "../../customHooks/useFetchTags";
import InputText from "../../sharedComponents/InputText";
import InputSelect from "./InputSelect";
type selectedSpecType = { id: string; option: string[] };
const CreatePlace = () => {
  const [section, setSection] = React.useState<string>("");
  const [placeName, setplaceName] = useState<string>("");
  const [address, setaddress] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [cityId, setCityId] = useState<string>("");
  const [tagsId, settagsId] = useState<string[]>([]);
  const [selectedSpecs, setselectedSpecs] = useState<selectedSpecType[]>([]);
  const placeTypes = useFetchPlaceType();
  const [specs, setspecs] = useFetchSpecs();
  const tags = useFetchTags();
  const selectValueHandler = (value: string) => {
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
    <Box sx={{ pl: 5, pr: "200px", mb: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                  variant={section === _section.name ? "contained" : "text"}
                  sx={{ boxShadow: 2 }}
                  onClick={() => setSection(_section.name)}
                >
                  {_section.name}
                </Button>
              );
            })}
          </Stack>
        </Grid>
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
        <Grid item xs={10}>
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
        <Grid item xs={12}>
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
                    onClick={() => selectValueHandler(spec.id)}
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
                    Boolean(tagsId.find((_tag) => _tag === tag.id))
                      ? "contained"
                      : "text"
                  }
                  sx={{ boxShadow: 2 }}
                  onClick={() => selectTagHandler(tag.id)}
                >
                  {tag.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePlace;
