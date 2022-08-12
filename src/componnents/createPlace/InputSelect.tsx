import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
type inputSelectProps = {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
};
const governorates = [
  { ui: "دمشق", server: "1" },
  { ui: "حلب", server: "2" },
  { ui: "الاذقية", server: "3" },
  { ui: "طرطوس", server: "4" },
  { ui: "ريف دمشق", server: "5" },
  { ui: "حمص", server: "6" },
  { ui: "حماه", server: "7" },
  { ui: "الحسكة", server: "8" },
  { ui: "دير الزور", server: "9" },
  { ui: "الرقة", server: "10" },
  { ui: "السويداء", server: "11" },
  { ui: "القنيطرة", server: "12" },
  { ui: "ادلب", server: "13" },
];
const InputSelect = ({ label, value, setValue }: inputSelectProps) => {
  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value as string);
  };
  return (
    <FormControl
      sx={{
        display: "block",
        width: "80%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "1rem",
          boxShadow: 1,
          width: "100%",
        },
        "& .MuiSvgIcon-root": {
          color: "primary.main",
        },
      }}
    >
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {governorates.map((governorate, index) => (
          <MenuItem key={index} value={governorate.server}>
            {governorate.ui}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
