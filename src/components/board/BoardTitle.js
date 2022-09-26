import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";

import { renameBoard } from "../../api/boards";

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
        queryClient.invalidateQueries(["boards"]);

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

// BoardTitle.propTypes = {
//   board: PropTypes.object.isRequired,
// };

export default BoardTitle;
