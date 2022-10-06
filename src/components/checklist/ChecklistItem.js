import React, { Fragment, useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";

import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";

import {
  completeChecklistItem,
  editChecklistItem,
  deleteChecklistItem,
} from "../../api/boards";

const ChecklistItem = ({ item, card }) => {
  const [text, setText] = useState(item.text);
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setText(item.text);
  }, [item.text]);

  const editMutation = useMutation(
    ({ cardId, itemId, text }) => editChecklistItem(cardId, itemId, text),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );

  const completeMutation = useMutation(
    ({ cardId, complete, itemId }) =>
      completeChecklistItem(cardId, complete, itemId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );

  const deleteMutation = useMutation(
    ({ cardId, itemId }) => deleteChecklistItem(cardId, itemId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );

  const onEdit = async (e) => {
    e.preventDefault();
    // editMutation.mutate(card._id, item._id, { text });
    editMutation.mutate({ cardId: card._id, itemId: item._id, text });
    setEditing(false);
  };

  const onComplete = async (e) => {
    completeMutation.mutate({
      cardId: card._id,
      complete: e.target.checked,
      itemId: item._id,
    });
  };

  const onDelete = async (e) => {
    // deleteMutation.mutate(card._id, item._id);
    deleteMutation.mutate({ cardId: card._id, itemId: item._id });
  };

  return (
    <div className="classes.checklistItem">
      {editing ? (
        <form
          onSubmit={(e) => onEdit(e)}
          className={classes.checklistFormLabel}
        >
          <TextField
            variant="filled"
            fullWidth
            multiline
            required
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onEdit(e)}
          />
          <div>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setText(item.text);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      ) : (
        <Fragment>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  card.checklist.find((cardItem) => cardItem._id === item._id)
                    .complete
                }
                onChange={onComplete}
                name={item._id}
              />
            }
            label={item.text}
            className={classes.checklistFormLabel}
          />
          <div className={classes.itemButtons}>
            <Button
              className={classes.itemButton}
              onClick={() => setEditing(true)}
            >
              <EditIcon />
            </Button>
            <Button
              color="secondary"
              className={classes.itemButton}
              onClick={onDelete}
            >
              <HighlightOffIcon />
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ChecklistItem;
