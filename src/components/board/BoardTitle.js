import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { renameBoard } from "../../api/boards";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const mutation = useMutation(
    ({ boardId, title }) => renameBoard(boardId, title),
    {
      onError: (error) => {
        toast.error(`Error: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
        });
      },

      onSuccess: (data) => {
        queryClient.invalidateQueries(["board"]);

        toast.success(`Success: ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
        });
      },
    }
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({ boardId: board._id, title });
    setEditing(false);
  };

  return !editing ? (
    <h2 className="board-title" onClick={() => setEditing(true)}>
      {board.title}
    </h2>
  ) : (
    <form className="board-title-form" onSubmit={(e) => onSubmitHandler(e)}>
      <ThemeProvider theme={theme}>
        <TextField
          variant="outlined"
          required
          value={title}
          size="small"
          onChange={(e) => setTitle(e.target.value)}
        />
      </ThemeProvider>
    </form>
  );
};

export default BoardTitle;
