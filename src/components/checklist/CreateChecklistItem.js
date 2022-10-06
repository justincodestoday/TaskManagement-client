import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";

import { TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { addChecklistItem } from "../../api/boards";

const CreateChecklistItem = ({ cardId }) => {
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ cardId, text }) => addChecklistItem(cardId, text),
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
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    // mutation.mutate(cardId, { text });
    mutation.mutate({ cardId: card._id, text });
    setText("");
  };

  return !adding ? (
    <div className={classes.checklistBottom}>
      <Button variant="contained" onClick={() => setAdding(true)}>
        + Add an item
      </Button>
    </div>
  ) : (
    <div className={classes.checklistBottom}>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="filled"
          fullWidth
          multiline
          required
          label="Add an item"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
          <Button
            onClick={() => {
              setAdding(false);
              setText("");
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateChecklistItem;
