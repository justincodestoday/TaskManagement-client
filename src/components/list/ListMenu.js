import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { archiveList } from "../../api/boards";
import MoveList from "./MoveList";

const ListMenu = ({ list, listId, board }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(({ id, archive }) => archiveList(id, archive), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["lists"]);
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmitHandler = async () => {
    mutation.mutate({ id: listId, archive: true });
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <MoreHorizIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            onSubmitHandler();
            handleClose();
          }}
        >
          Archive This List
        </MenuItem>
        <MenuItem>
          {/* <MoveList
            listData={list}
            listId={listId}
            board={board}
            closeMenu={handleClose}
          /> */}
        </MenuItem>
      </Menu>
    </div>
  );
};

// ListMenu.propTypes = {
//   listId: PropTypes.string.isRequired,
// };

export default ListMenu;
