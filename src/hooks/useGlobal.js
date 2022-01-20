import { useContext, useState } from "react";
import { useLocalStorage } from "react-use";

import { globalContext } from "../contexts/GlobalProvider";

function useGlobalProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  return {
    token,
    setToken,
    removeToken,
    openForgotPasswordModal,
    setOpenForgotPasswordModal,
    commentsList,
    setCommentsList,
  };
}

function useGlobal() {
  return useContext(globalContext);
}

export { useGlobalProvider, useGlobal };
