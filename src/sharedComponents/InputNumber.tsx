import React from "react";
import TextField from "@mui/material/TextField";
type inputNumberProps = {
  label: string;
  value: number;
  setValue: (newValue: number) => void;
};
const InputNumber = ({ label, value, setValue }: inputNumberProps) => {
  return (
    <>
      <TextField
        label={label}
        type={"number"}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        sx={{
          display: "block",
          "& .MuiOutlinedInput-root": {
            borderRadius: "1rem",
            boxShadow: 1,
            width: "100%",
          },
          width: "80%",
        }}
      />
    </>
  );
};

export default InputNumber;
