import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import InputPw from "../../components/InputPw";
import { useGlobal } from "../../hooks/useGlobal";
import axiosInstance from "../../services/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme();

function isSignIn() {
  return window.location.pathname === "/signin";
}

function SignInOrUp({ onSubmit }) {
  const { setToken } = useGlobal();
  const navigate = useNavigate();
  const { setOpenForgotPasswordModal } = useGlobal();
  const [formInfo, setFormInfo] = React.useState({
    username: "",
    pw: "",
    confirmPw: "",
  });

  const initialLocalError = {
    status: false,
    message: "",
  };
  const [localError, setLocalError] = React.useState(initialLocalError);

  function isEmptyFields() {
    if (isSignIn()) {
      return !formInfo.username || !formInfo.pw;
    } else {
      return !formInfo.username || !formInfo.pw || !formInfo.confirmPw;
    }
  }

  function isDismatchPw() {
    return formInfo.pw !== formInfo.confirmPw;
  }

  function handleForgotPassword() {
    setOpenForgotPasswordModal(true);
  }

  function handleUsernameChange(e) {
    setFormInfo({ ...formInfo, username: e.target.value });
  }
  function handlePwChange(e) {
    setLocalError(initialLocalError);
    setFormInfo({ ...formInfo, pw: e.target.value });
  }
  function handleConfirmPwChange(e) {
    setLocalError(initialLocalError);
    setFormInfo({ ...formInfo, confirmPw: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const reqBody = {
      username: formInfo.username,
      password: formInfo.pw,
    };

    if (isSignIn()) {
      try {
        const { data } = await axiosInstance.post("/sign-in", reqBody);
        setToken(data);
        navigate("/");
      } catch {
        toast.error("Usuário e/ou senha incorretos");
      }
    } else {
      if (isDismatchPw()) {
        return setLocalError({ status: true, message: "Senhas não coincidem" });
      }
      try {
        await axiosInstance.post("/sign-up", reqBody);
        toast.success("Cadastrado com sucesso !");
        setTimeout(() => navigate("/login"), 2500);
      } catch (error) {
        if (error.response.status === 422) {
          setLocalError({ status: true, message: "A senha deve ter pelo menos 3 caracteres" });
          return;
        }
        toast.error("Usuário já existe");
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ pt: "20vh" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: isSignIn() ? "primary.main" : "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignIn() ? "Login" : "Cadastro"}
          </Typography>

          <Grid
            data-testid="form-signin-signup"
            container
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleUsernameChange}
            />
            <InputPw
              id="outlined-adornment-password"
              value={formInfo.pw}
              label="Senha *"
              name="password"
              onChange={handlePwChange}
            />
            {!isSignIn() && (
              <InputPw
                id="outlined-adornment-confirm-password"
                value={formInfo.confirmPw}
                label="Repita a senha *"
                name="confirm-password"
                onChange={handleConfirmPwChange}
                error={localError}
              />
            )}
            <Button
              data-testid="btn-login-cadastrar"
              disabled={isEmptyFields()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              {isSignIn() ? "Login" : "Cadastrar"}
            </Button>
            <Grid container>
              <Grid item xs>
                {!!isSignIn() && (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "underline", cursor: "pointer", color: "primary.main" }}
                    onClick={handleForgotPassword}
                  >
                    Esqueceu a senha ?
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Link to={isSignIn() ? "/signup" : "/signin"}>
                  <Typography variant="body2">
                    {isSignIn()
                      ? "Não tem uma conta ? Cadastre-se"
                      : "Já tem uma conta ? Faça login"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ForgotPasswordModal />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default SignInOrUp;
