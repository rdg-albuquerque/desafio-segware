import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Grid, IconButton, Typography } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobal } from "../../hooks/useGlobal";
import axiosInstance from "../../services/axiosInstance";
import formatDate from "./utils";

function Post({ comment }) {
  const navigate = useNavigate();
  const { token, commentsList, setCommentsList } = useGlobal();

  async function handleLikeClick(comment) {
    const updatedComment = {
      ...comment,
      activeUserLikedIt: comment.activeUserLikedIt ? 0 : 1,
      likes: comment.activeUserLikedIt ? comment.likes - 1 : comment.likes + 1,
    };
    const updatedCommentIndex = commentsList.findIndex(
      (commentIndex) => commentIndex.id === comment.id
    );
    const updatedCommentsList = [...commentsList];
    updatedCommentsList[updatedCommentIndex] = updatedComment;
    setCommentsList(updatedCommentsList);

    try {
      const reqBody = {
        feedId: updatedComment.id,
        like: updatedComment.activeUserLikedIt ? true : false,
      };
      await axiosInstance.post("/reaction", reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      navigate("/signin");
      toast.error("Sua sessão expirou");
    }
  }
  return (
    <Grid
      container
      sm
      sx={{
        fontFamily: "Lato",
        flexDirection: "column",
        mb: 3,
        backgroundColor: "rgba(0, 1, 121, 0.05)",
        borderRadius: 1,
        p: 1,
        pl: 2,
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
          fontFamily: "fantasy",
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: "Lato" }}>
          {comment.author.username}
        </Typography>
      </Grid>
      <Grid item sx={{ pl: "5px", mb: 1 }}>
        {comment.content}
      </Grid>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="small" onClick={() => handleLikeClick(comment)}>
          {!!comment.activeUserLikedIt ? (
            <ThumbUpIcon fontSize="small" color="primary" />
          ) : (
            <ThumbUpOutlinedIcon fontSize="small" color="primary" />
          )}
        </IconButton>
        <Typography variant="body2" sx={{ fontFamily: "Lato" }}>
          {comment.likes}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "Lato", fontSize: "0.8rem", ml: 2 }}>
          {formatDate(comment.createdAt)}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default memo(Post);
