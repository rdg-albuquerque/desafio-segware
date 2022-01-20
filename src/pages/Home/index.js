import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Post from "../../components/Post";
import { useGlobal } from "../../hooks/useGlobal";
import axiosInstance from "../../services/axiosInstance";

function Home() {
  const { token, commentsList, setCommentsList } = useGlobal();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  function reqConfig() {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  async function getData() {
    try {
      const { data } = await axiosInstance.get("/feeds", reqConfig());
      setCommentsList(data);
      console.log(data);
    } catch {
      navigate("/signin");
      toast.error("Sua sessão expirou");
    }
  }

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);

  async function handleSubmitComment(e) {
    e.preventDefault();
    const reqBody = {
      content: comment,
    };
    try {
      await axiosInstance.post("/feed", reqBody, reqConfig());
      getData();
    } catch {
      navigate("/signin");
      toast.error("Sua sessão expirou");
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Grid
        container
        sm={6}
        sx={{ mt: 20, pl: 3, pr: 3, display: "flex", flexDirection: "column" }}
      >
        <Grid
          container
          component="form"
          onSubmit={handleSubmitComment}
          noValidate
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <TextField
              required
              fullWidth
              id="outlined-multiline-flexible"
              label="Comentário"
              name="comment"
              value={comment}
              autoFocus
              multiline
              maxRows={4}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>

          <Grid
            item
            sm={6}
            sx={{
              mt: 2,
              "@media screen and (min-width: 600px)": {
                alignSelf: "flex-end",
              },
            }}
          >
            <Button disabled={!comment} type="submit" fullWidth variant="contained">
              Postar
            </Button>
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          sx={{ mb: 2, mt: 5, color: "rgb(38, 38, 38)", fontFamily: "Roboto" }}
        >
          Comentários
        </Typography>
        {!!commentsList.length &&
          commentsList.map((comment) => <Post key={comment.id} comment={comment} />)}
      </Grid>
    </Box>
  );
}

export default Home;
