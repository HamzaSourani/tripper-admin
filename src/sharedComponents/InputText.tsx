import React from "react";
import TextField from "@mui/material/TextField";
type inputTextProps = {
  label: string;
  mulitline?: boolean;
  value: string;
  setValue: (newValue: string) => void;
};
const InputText = ({ label, value, setValue, mulitline }: inputTextProps) => {
  return (
    <>
      <TextField
        multiline={mulitline}
        label={label}
        type={"text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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

export default InputText;
