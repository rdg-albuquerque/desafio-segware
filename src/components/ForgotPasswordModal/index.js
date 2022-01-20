import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { useGlobal } from "../../hooks/useGlobal";
import axiosInstance from "../../services/axiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function ForgotPasswordModal() {
  const { openForgotPasswordModal, setOpenForgotPasswordModal } = useGlobal();
  const [username, setUsername] = useState("");
  const [pwRecovered, setPwRecovered] = useState("");
  const [userDontExist, setUserDontExist] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPwRecovered("");
    setUserDontExist(false);

    if (!username) return;
    try {
      const { data } = await axiosInstance.get(`/forgot-password/${username}`);
      if (!data) {
        setUserDontExist(true);
        return;
      }
      setPwRecovered(data.password);
    } catch (error) {
      setPwRecovered("");
    }
  }

  return (
    <div>
      <Modal
        open={openForgotPasswordModal}
        onClose={() => setOpenForgotPasswordModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Grid item>
              <Typography id="modal-modal-title" variant="h5" component="h1">
                Digite seu username
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Recuperar senha
              </Button>
            </Grid>
            <Grid item>
              {!!pwRecovered && <Typography>Senha: {pwRecovered}</Typography>}
              {!!userDontExist && <Typography>Usuário incorreto</Typography>}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default ForgotPasswordModal;
