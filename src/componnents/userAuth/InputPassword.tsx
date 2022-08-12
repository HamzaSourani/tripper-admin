import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
type inputPasswordProps = {
  label: string;
  value: string;
  width?: string;
  setValue: (newValue: string) => void;
};
const InputPassword = ({
  label,
  value,
  setValue,
  width,
}: inputPasswordProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <>
      <TextField
        label={label}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setShowPassword(!showPassword)}
              color="primary"
            >
              {showPassword ? (
                <VisibilityOffIcon color="primary" />
              ) : (
                <VisibilityIcon color="primary" />
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          display: "block",
          "& .MuiOutlinedInput-root": {
            width: "100%",
            borderRadius: "1rem",
            boxShadow: 1,
          },
          width: width ? width : "80%",
        }}
      />
    </>
  );
};

export default InputPassword;
