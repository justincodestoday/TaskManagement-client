import React, { useRef, useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { addList } from "../../api/boards";

const CreateList = ({ board }) => {
  const [adding, setAdding] = useState(false);
  const [boardId, setBoardId] = useState(board._id);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ title, boardId }) => addList(title, boardId),
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
        queryClient.invalidateQueries(["lists"]);

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

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ title, boardId: board._id });
    setTitle("");
    setAdding(false);
  };

  return !adding ? (
    <div className="create-list-button">
      <Button variant="contained" onClick={() => setAdding(true)}>
        <AddCircleOutlineIcon /> Add a list
      </Button>
    </div>
  ) : (
    <div ref={formRef} className="create-list-form">
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          required
          label="Enter list title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Add List
          </Button>
          <Button
            onClick={() => {
              setAdding(false);
              setTitle("");
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateList;
