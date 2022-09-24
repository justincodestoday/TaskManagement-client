import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";

import { TextField } from "@mui/material";

import { renameBoard } from "../../actions/board";

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);

  //   useEffect(() => {
  //     setTitle(board.title);
  //   }, [board.title]);
  const mutation = useMutation(({ _id, title }) => renameBoard(_id, title), {
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
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({ _id, title });
    setEditing(false);
  };

  return !editing ? (
    <h2 className="board-title" onClick={() => setEditing(true)}>
      {board.title}
    </h2>
  ) : (
    <form className="board-title-form" onSubmit={(e) => onSubmitHandler(e)}>
      <TextField
        variant="outlined"
        required
        value={title}
        size="small"
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default BoardTitle;
