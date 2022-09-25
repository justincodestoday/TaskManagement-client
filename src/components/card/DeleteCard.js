import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { deleteCard } from "../../api/boards";

const DeleteCard = ({ cardId, setOpen, list }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onDeleteCard = async () => {
    dispatch(deleteCard(list._id, cardId));
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

DeleteCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

export default DeleteCard;
