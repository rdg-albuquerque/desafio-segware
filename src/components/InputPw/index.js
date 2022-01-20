import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, InputLabel, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import * as React from "react";

function InputPw({ label, error, ...rest }) {
  const [showPw, setShowPw] = React.useState(false);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        {...rest}
        label={label}
        type={showPw ? "text" : "password"}
        error={error ? error.status : false}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPw(!showPw)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPw ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <Typography variant="body2" sx={{ color: "red", ml: 1, position: "absolute", top: 60 }}>
        {error && error.status ? error.message : ""}
      </Typography>
    </FormControl>
  );
}

export default InputPw;
