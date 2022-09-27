import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { deleteCard } from "../../api/boards";

const DeleteCard = ({ cardId, setOpen, list, board }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ listId, cardId, boardId }) => deleteCard(listId, cardId, boardId),
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

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onDeleteCard = async () => {
    mutation.mutate({ listId: list._id, cardId: cardId, boardId: board._id });
    setOpenDialog(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete Card
      </Button>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{"Delete card?"}</DialogTitle>
        <DialogActions>
          <Button
            onClick={onDeleteCard}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCard;
