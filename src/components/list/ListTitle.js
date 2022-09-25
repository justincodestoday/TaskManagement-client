import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";

import { renameList } from "../../api/boards";

const ListTitle = ({ list, board }) => {
  const [editing, setEditing] = useState(false);
  const [boardId, setBoardId] = useState(board._id);
  const [listId, setListId] = useState(list._id);
  const [title, setTitle] = useState(list.title);

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  useEffect(() => {
    setBoardId(board._id);
  }, [board._id]);

  useEffect(() => {
    setListId(list._id);
  }, [list._id]);

  const mutation = useMutation(
    ({ boardId, listId, title }) => renameList(boardId, listId, title),
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
    mutation.mutate({ boardId, listId, title });
    setEditing(false);
  };

  return !editing ? (
    <h3 className="list-title" onClick={() => setEditing(true)}>
      {list.title}
    </h3>
  ) : (
    <form onSubmit={(e) => onSubmitHandler(e)}>
      <TextField
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

// ListTitle.propTypes = {
//   list: PropTypes.object.isRequired,
// };

export default ListTitle;
