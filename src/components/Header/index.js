import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGlobal } from "../../hooks/useGlobal";

function Header() {
  const { removeToken } = useGlobal();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box />
        <Typography sx={{ fontFamily: "Dancing Script" }} variant="h4" component="div">
          Seggram
        </Typography>
        <IconButton size="large" onClick={() => removeToken()}>
          <LogoutIcon sx={{ color: "#FFF" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
