import React, { Fragment, useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { moveList } from "../../api/boards";

const MoveList = ({ listData, listId, board, closeMenu }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const lists = board.lists;
  const listObjects = listData;
  const queryClient = useQueryClient();

  useEffect(() => {
    const mappedListObjects = listObjects
      .sort(
        (a, b) =>
          lists.findIndex((id) => id === a._id) -
          lists.findIndex((id) => id === b._id)
      )
      .map((list, index) => ({ list, index }));
    setPositions(
      mappedListObjects
        .filter((list) => !list.list.archived)
        .map((list) => list.index)
    );
    setPosition(
      mappedListObjects.findIndex((list) => list.list._id === listId)
    );
  }, [lists, listId, listObjects]);

  const mutation = useMutation(({ id, toIndex }) => moveList(id, toIndex), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["lists"]);
    },
  });

  const onSubmitHandler = async () => {
    mutation.mutate({ listId, toIndex: position });
    setOpenDialog(false);
    closeMenu();
  };

  return (
    <Fragment>
      <div onClick={() => setOpenDialog(true)}>Move This List</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="flex">
          <DialogTitle>{"Move List"}</DialogTitle>
          <Button onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </Button>
        </div>
        <DialogActions className="flex flex-col">
          <FormControl>
            <InputLabel shrink>Position</InputLabel>
            <Select
              value={position}
              required
              onChange={(e) => setPosition(e.target.value)}
              displayEmpty
            >
              {positions.map((position, index) => (
                <MenuItem key={position} value={position}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-5"
              onClick={onSubmitHandler}
            >
              Move List
            </Button>
          </FormControl>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default MoveList;
