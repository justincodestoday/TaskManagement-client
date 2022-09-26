import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { Card, CardContent, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { addCard } from "../../api/boards";

const CreateCardForm = ({ listId, setAdding, board }) => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ title, listId, boardId }) => addCard(title, listId, boardId),
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
        queryClient.invalidateQueries(["cards"]);

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

  console.log({ title, listId: listId, boardId: board._id });

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({ title, listId: listId, boardId: board._id });
    setTitle("");
    setAdding(false);
  };

  return (
    <form
      ref={formRef}
      className="create-card-form"
      onSubmit={(e) => onSubmitHandler(e)}
    >
      <Card>
        <CardContent className="card-edit-content">
          <TextField
            margin="normal"
            fullWidth
            multiline
            required
            label="Enter a title for this card"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmitHandler(e)}
          />
        </CardContent>
      </Card>
      <div className="card-actions">
        <Button type="submit" variant="contained" color="primary">
          Add Card
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
  );
};

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
