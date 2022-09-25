import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { archiveList } from "../../api/boards";
import MoveList from "./MoveList";

const ListMenu = ({ listId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const dispatch = useDispatch();
  const dispatch = "";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const archive = async () => {
    dispatch(archiveList(listId, true));
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
            archive();
            handleClose();
          }}
        >
          Archive This List
        </MenuItem>
        <MenuItem>
          <MoveList listId={listId} closeMenu={handleClose} />
        </MenuItem>
      </Menu>
    </div>
  );
};

// ListMenu.propTypes = {
//   listId: PropTypes.string.isRequired,
// };

export default ListMenu;
