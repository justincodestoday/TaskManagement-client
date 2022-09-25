import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, List, ListItem, ListItemText } from "@mui/material";

import { archiveList } from "../../api/boards";

const ArchivedLists = () => {
  const listObjects = useSelector((state) => state.board.board.listObjects);
  const dispatch = useDispatch();

  const onSubmit = async (listId) => {
    dispatch(archiveList(listId, false));
  };

  return (
    <div>
      <List>
        {listObjects
          .filter((list) => list.archived)
          .map((list, index) => (
            <ListItem key={index}>
              <ListItemText primary={list.title} />
              <Button onClick={() => onSubmit(list._id)}>Send to Board</Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedLists;
