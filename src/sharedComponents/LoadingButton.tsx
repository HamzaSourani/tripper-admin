import React from "react";
import Button from "@mui/lab/LoadingButton";

type loadingButtonProps = {
  label: string;
  onClick: () => void;
  loading: boolean;
  sx?: {};
};
const LoadingButton = ({ label, onClick, loading, sx }: loadingButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{ ...sx }}
      loading={loading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default LoadingButton;
